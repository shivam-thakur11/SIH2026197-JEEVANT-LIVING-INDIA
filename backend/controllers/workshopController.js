const Workshop = require('../models/Workshop');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/workshops
 * List workshops with search, location, date, and status filtering
 */
const getAllWorkshops = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};

      if (req.query.status && req.query.status !== 'All') {
        filter.status = new RegExp(req.query.status, 'i');
      }
      if (req.query.location) {
        filter.location = new RegExp(req.query.location, 'i');
      }
      if (req.query.date) {
        filter.date = new RegExp(req.query.date, 'i');
      }
      if (req.query.mode && req.query.mode !== 'All') {
        filter.mode = new RegExp(req.query.mode, 'i');
      }
      if (req.query.craft) {
        filter.craft = new RegExp(req.query.craft, 'i');
      }
      if (req.query.state && req.query.state !== 'All') {
        filter.state = new RegExp(req.query.state, 'i');
      }
      if (req.query.artisan) {
        filter.$or = [{ artisan: req.query.artisan }, { artisanId: req.query.artisan }];
      }

      const p = Math.max(1, parseInt(req.query.page, 10) || 1);
      const l = Math.max(1, parseInt(req.query.limit, 10) || 12);
      const total = await Workshop.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      const workshops = await Workshop.find(filter)
        .populate('artisan', 'name craft state image phone')
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        count: workshops.length,
        isLiveDatabase: true,
        data: workshops,
        pagination: { page: p, limit: l, total, totalPages },
      });
    }

    // Offline Demo Mode
    const result = demoStore.getWorkshops(req.query);
    const workshops = Array.isArray(result) ? result : result.data;
    const pagination = result.pagination || { page: 1, limit: workshops.length, total: workshops.length, totalPages: 1 };

    res.json({
      success: true,
      count: workshops.length,
      isLiveDatabase: false,
      data: workshops,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/workshops/:id */
const getWorkshopById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const workshop = await Workshop.findById(req.params.id).populate('artisan');
      if (!workshop) return next(new AppError('Workshop not found.', 404));
      return res.json({ success: true, isLiveDatabase: true, data: workshop });
    }

    // Offline Demo Mode
    const workshop = demoStore.getWorkshopById(req.params.id);
    if (!workshop) return next(new AppError('Workshop not found.', 404));
    res.json({ success: true, isLiveDatabase: false, data: workshop });
  } catch (error) {
    next(error);
  }
};

/** POST /api/workshops — Artisan or Admin */
const createWorkshop = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const workshop = await Workshop.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Masterclass created and scheduled.',
        isLiveDatabase: true,
        data: workshop,
      });
    }

    // Offline Demo Mode
    const workshop = demoStore.createWorkshop(req.body);
    res.status(201).json({
      success: true,
      message: 'Masterclass created and scheduled. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: workshop,
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/workshops/:id & PATCH /api/workshops/:id */
const updateWorkshop = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!workshop) return next(new AppError('Workshop not found.', 404));
      return res.json({
        success: true,
        message: 'Workshop updated successfully.',
        isLiveDatabase: true,
        data: workshop,
      });
    }

    // Offline Demo Mode
    const workshop = demoStore.updateWorkshop(req.params.id, req.body);
    if (!workshop) return next(new AppError('Workshop not found.', 404));
    res.json({
      success: true,
      message: 'Workshop updated successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: workshop,
    });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/workshops/:id */
const deleteWorkshop = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const workshop = await Workshop.findByIdAndDelete(req.params.id);
      if (!workshop) return next(new AppError('Workshop not found.', 404));
      return res.json({
        success: true,
        message: 'Workshop cancelled and removed.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const deleted = demoStore.deleteWorkshop(req.params.id);
    if (!deleted) return next(new AppError('Workshop not found.', 404));
    res.json({
      success: true,
      message: 'Workshop cancelled and removed. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/workshops/:id/enroll
 * Workshop enrollment logic: increments enrolled seat count without fake payments.
 */
const enrollWorkshop = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const workshop = await Workshop.findById(req.params.id);
      if (!workshop) return next(new AppError('Workshop not found.', 404));

      const currentBooked = workshop.enrolled || workshop.seatsBooked || 0;
      const capacity = workshop.capacity || workshop.seatsTotal || 30;

      if (currentBooked >= capacity) {
        return next(new AppError('This masterclass has reached maximum capacity.', 400));
      }

      workshop.enrolled = currentBooked + 1;
      workshop.seatsBooked = workshop.enrolled;
      if (workshop.enrolled >= capacity) {
        workshop.status = 'Full';
      }
      await workshop.save();

      return res.json({
        success: true,
        message: `Successfully enrolled in "${workshop.title}"! (Live Database Enrollment)`,
        isLiveDatabase: true,
        data: workshop,
      });
    }

    // Offline Demo Mode
    const result = demoStore.enrollWorkshop(req.params.id);
    if (!result) return next(new AppError('Workshop not found.', 404));
    if (result.error === 'Full') {
      return next(new AppError('This masterclass has reached maximum capacity.', 400));
    }
    res.json({
      success: true,
      message: `Successfully enrolled in "${result.title}"! (Offline Demo Mode)`,
      isLiveDatabase: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  enrollWorkshop,
};
