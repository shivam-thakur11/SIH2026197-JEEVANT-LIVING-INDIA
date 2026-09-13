const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // The user who booked the workshop
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userId: {
      type: String,
      trim: true,
      default: null,
    },
    userName: {
      type: String,
      trim: true,
      required: [true, 'Attendee name is required'],
    },
    userEmail: {
      type: String,
      trim: true,
      required: [true, 'Attendee email is required'],
    },
    userPhone: {
      type: String,
      trim: true,
    },

    // Workshop booked
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop',
      default: null,
    },
    workshopId: {
      type: String,
      trim: true,
      required: [true, 'Workshop ID is required'],
    },
    workshopTitle: {
      type: String,
      trim: true,
      required: [true, 'Workshop title is required'],
    },

    // Artisan conducting the session
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      default: null,
    },
    artisanId: {
      type: String,
      trim: true,
    },
    artisanName: {
      type: String,
      trim: true,
    },

    // Booking Details
    seats: {
      type: Number,
      default: 1,
      min: [1, 'Must book at least 1 seat'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: 0,
    },
    date: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g. "JVT-PASS-9821"
    },
    qrCode: {
      type: String, // SVG or data URI string
    },
    attendees: {
      type: [Object],
      default: [],
    },

    // Statuses
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'refunded'],
      default: 'paid',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
