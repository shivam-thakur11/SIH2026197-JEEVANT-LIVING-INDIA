const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Workshop = require('../models/Workshop');
const Payment = require('../models/Payment');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');
const { createNotificationRecord } = require('./notificationController');

/**
 * GET /api/bookings
 * Query params: userId, workshopId, page, limit
 */
const getBookings = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      const { userId, workshopId, page = 1, limit = 12 } = req.query;

      if (userId) {
        if (mongoose.Types.ObjectId.isValid(userId)) {
          filter.$or = [{ user: userId }, { userId }];
        } else {
          filter.$or = [{ userId }, { userEmail: userId }];
        }
      }
      if (workshopId) {
        if (mongoose.Types.ObjectId.isValid(workshopId)) {
          filter.$or = [{ workshop: workshopId }, { workshopId }];
        } else {
          filter.workshopId = workshopId;
        }
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 12);
      const total = await Booking.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      const bookings = await Booking.find(filter)
        .populate('workshop', 'title date time location image fee mode')
        .populate('artisan', 'name state craft')
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: bookings,
        pagination: { page: p, limit: l, total, totalPages },
      });
    }

    // Offline Demo Mode
    const result = demoStore.getBookings(req.query);
    res.json({
      success: true,
      isLiveDatabase: false,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/bookings/:id
 */
const getBookingById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const booking = await Booking.findById(req.params.id)
        .populate('workshop')
        .populate('artisan');
      if (!booking) {
        return next(new AppError('Booking pass not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, data: booking });
    }

    const booking = demoStore.getBookingById(req.params.id);
    if (!booking) {
      return next(new AppError('Booking pass not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: booking });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/bookings
 * Decrements availableSeats on the workshop, creates pass and DBT payout
 */
const createBooking = async (req, res, next) => {
  try {
    const bookingData = {
      ...req.body,
      userName: req.body.userName || req.body.attendeeName || (req.user && req.user.name) || 'Cultural Enthusiast',
      userEmail: req.body.userEmail || req.body.attendeeEmail || (req.user && req.user.email) || 'learner@jeevant.org',
    };
    const workshopId = bookingData.workshopId || bookingData.workshop;
    const seatsToBook = Number(bookingData.seats || 1);

    if (isDBConnected()) {
      const workshop = await Workshop.findById(workshopId);
      if (!workshop) {
        return next(new AppError('Workshop not found.', 404));
      }

      const available = workshop.availableSeats !== undefined
        ? workshop.availableSeats
        : (workshop.capacity || 30) - (workshop.enrolled || 0);

      if (available < seatsToBook) {
        return next(new AppError(`Only ${available} seat(s) remaining for this workshop.`, 400));
      }

      // Decrement seats
      workshop.enrolled = (workshop.enrolled || 0) + seatsToBook;
      workshop.seatsBooked = workshop.enrolled;
      workshop.availableSeats = Math.max(0, available - seatsToBook);
      if (workshop.availableSeats === 0) {
        workshop.status = 'Full';
      }
      await workshop.save();

      const bookingRef = `JVT-PASS-${Math.floor(10000 + Math.random() * 90000)}`;
      const newBooking = await Booking.create({
        ...bookingData,
        workshopTitle: workshop.title,
        date: workshop.date,
        time: workshop.time,
        location: workshop.location,
        bookingReference: bookingRef,
        seats: seatsToBook,
        status: 'confirmed',
        paymentStatus: 'paid',
      });

      // Create DBT Payment record
      await Payment.create({
        transactionId: `TXN-DBT-${Math.floor(1000 + Math.random() * 9000)}`,
        user: newBooking.user || null,
        workshop: workshop._id,
        artisan: workshop.artisan || null,
        artisanName: workshop.artisanName || 'Master Craftsperson',
        craft: workshop.craft || 'Living Tradition',
        amount: newBooking.totalAmount,
        grossAmount: `₹${newBooking.totalAmount}`,
        netPayout: `₹${newBooking.totalAmount}`,
        payoutMethod: 'Direct DBT / UPI',
        status: 'Disbursed',
        paymentStatus: 'completed',
      });

      // Trigger real notification
      createNotificationRecord({
        recipientRole: 'all',
        type: 'booking',
        title: 'Masterclass Seat Confirmed',
        message: `Booking confirmed for "${workshop.title}" (${seatsToBook} seat(s)). Ref: ${bookingRef}`,
        relatedEntity: 'Booking',
        relatedEntityId: newBooking._id,
      }).catch((e) => console.error('Notif error:', e.message));

      return res.status(201).json({ success: true, isLiveDatabase: true, data: newBooking });
    }

    // Offline Demo Mode
    const newBooking = demoStore.createBooking(bookingData);
    res.status(201).json({ success: true, isLiveDatabase: false, data: newBooking });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/bookings/:id/cancel
 */
const cancelBooking = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return next(new AppError('Booking not found.', 404));
      }

      booking.status = 'cancelled';
      booking.paymentStatus = 'refunded';
      await booking.save();

      // Restore seats
      const workshop = await Workshop.findById(booking.workshop || booking.workshopId);
      if (workshop) {
        const seats = Number(booking.seats || 1);
        workshop.enrolled = Math.max(0, (workshop.enrolled || 0) - seats);
        workshop.seatsBooked = workshop.enrolled;
        workshop.availableSeats = (workshop.capacity || 30) - workshop.enrolled;
        if (workshop.availableSeats > 0 && workshop.status === 'Full') {
          workshop.status = 'Upcoming';
        }
        await workshop.save();
      }

      return res.json({ success: true, isLiveDatabase: true, data: booking });
    }

    const cancelled = demoStore.cancelBooking(req.params.id);
    if (!cancelled) {
      return next(new AppError('Booking not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: cancelled });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking,
};
