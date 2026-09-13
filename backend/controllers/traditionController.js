const Tradition = require('../models/Tradition');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/traditions
 * List traditions with search and filters by state, category, tags, title
 */
const getAllTraditions = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};

      if (req.query.state) {
        filter.state = new RegExp(req.query.state, 'i');
      }
      if (req.query.category) {
        filter.category = new RegExp(req.query.category, 'i');
      }
      if (req.query.tags) {
        filter.tags = { $in: req.query.tags.split(',').map((t) => t.trim()) };
      }
      if (req.query.title) {
        const titleRegex = new RegExp(req.query.title, 'i');
        filter.$or = [{ title: titleRegex }, { name: titleRegex }];
      }
      if (req.query.riskLevel && req.query.riskLevel !== 'All') {
        filter.riskLevel = new RegExp(req.query.riskLevel, 'i');
      }
      if (req.query.status) {
        filter.status = req.query.status;
      }

      if (req.query.search) {
        const regex = new RegExp(req.query.search, 'i');
        filter.$or = [
          { title: regex },
          { name: regex },
          { state: regex },
          { category: regex },
          { description: regex },
          { history: regex },
          { materials: regex },
          { giStatus: regex },
        ];
      }

      const p = Math.max(1, parseInt(req.query.page, 10) || 1);
      const l = Math.max(1, parseInt(req.query.limit, 10) || 12);
      const total = await Tradition.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      const traditions = await Tradition.find(filter)
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        count: traditions.length,
        isLiveDatabase: true,
        data: traditions,
        pagination: { page: p, limit: l, total, totalPages },
      });
    }

    // Offline Demo Mode
    const result = demoStore.getTraditions(req.query);
    const traditions = Array.isArray(result) ? result : result.data;
    const pagination = result.pagination || { page: 1, limit: traditions.length, total: traditions.length, totalPages: 1 };

    res.json({
      success: true,
      count: traditions.length,
      isLiveDatabase: false,
      data: traditions,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/traditions/:id */
const getTraditionById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const tradition = await Tradition.findById(req.params.id);
      if (!tradition) return next(new AppError('Tradition not found.', 404));
      return res.json({ success: true, isLiveDatabase: true, data: tradition });
    }

    // Offline Demo Mode
    const tradition = demoStore.getTraditionById(req.params.id);
    if (!tradition) return next(new AppError('Tradition not found.', 404));
    res.json({ success: true, isLiveDatabase: false, data: tradition });
  } catch (error) {
    next(error);
  }
};

/** POST /api/traditions — Admin or authenticated contributor */
const createTradition = async (req, res, next) => {
  try {
    const traditionData = {
      ...req.body,
      createdBy: req.user ? req.user._id || req.user.id : null,
    };
    if (traditionData.tags && typeof traditionData.tags === 'string') {
      traditionData.tags = traditionData.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    if (isDBConnected()) {
      const tradition = await Tradition.create(traditionData);
      return res.status(201).json({
        success: true,
        message: 'Tradition archived successfully.',
        isLiveDatabase: true,
        data: tradition,
      });
    }

    // Offline Demo Mode
    const tradition = demoStore.createTradition(traditionData);
    res.status(201).json({
      success: true,
      message: 'Tradition archived successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: tradition,
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/traditions/:id & PATCH /api/traditions/:id — Admin */
const updateTradition = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    if (isDBConnected()) {
      const tradition = await Tradition.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!tradition) return next(new AppError('Tradition not found.', 404));
      return res.json({
        success: true,
        message: 'Tradition updated successfully.',
        isLiveDatabase: true,
        data: tradition,
      });
    }

    // Offline Demo Mode
    const tradition = demoStore.updateTradition(req.params.id, updateData);
    if (!tradition) return next(new AppError('Tradition not found.', 404));
    res.json({
      success: true,
      message: 'Tradition updated successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: tradition,
    });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/traditions/:id — Admin */
const deleteTradition = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const tradition = await Tradition.findByIdAndDelete(req.params.id);
      if (!tradition) return next(new AppError('Tradition not found.', 404));
      return res.json({
        success: true,
        message: 'Tradition record deleted successfully.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const deleted = demoStore.deleteTradition(req.params.id);
    if (!deleted) return next(new AppError('Tradition not found.', 404));
    res.json({
      success: true,
      message: 'Tradition record deleted successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTraditions,
  getTraditionById,
  createTradition,
  updateTradition,
  deleteTradition,
};
