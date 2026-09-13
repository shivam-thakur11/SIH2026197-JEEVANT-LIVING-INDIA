const SavedCulture = require('../models/SavedCulture');
const Tradition = require('../models/Tradition');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/saved-cultures
 * Query params: userId, page, limit
 */
const getSavedCultures = async (req, res, next) => {
  try {
    const { userId, page = 1, limit = 20 } = req.query;

    if (isDBConnected()) {
      const filter = {};
      if (userId) {
        filter.$or = [{ user: userId }, { userId }];
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 20);
      const total = await SavedCulture.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      const saved = await SavedCulture.find(filter)
        .populate('tradition')
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: saved,
        pagination: { page: p, limit: l, total, totalPages },
      });
    }

    // Offline Demo Mode
    const result = demoStore.getSavedCultures(req.query);
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
 * POST /api/saved-cultures/toggle
 * Body: { userId, traditionId }
 */
const toggleSavedCulture = async (req, res, next) => {
  try {
    const { userId, traditionId } = req.body;
    if (!userId || !traditionId) {
      return next(new AppError('userId and traditionId are required.', 400));
    }

    if (isDBConnected()) {
      const existing = await SavedCulture.findOne({
        $or: [
          { userId, traditionId },
          { user: userId, tradition: traditionId },
        ],
      });

      if (existing) {
        await SavedCulture.findByIdAndDelete(existing._id);
        return res.json({ success: true, isLiveDatabase: true, saved: false, traditionId });
      }

      const tradition = await Tradition.findById(traditionId);
      const created = await SavedCulture.create({
        user: userId,
        userId,
        tradition: traditionId,
        traditionId,
        traditionName: tradition ? (tradition.title || tradition.name) : 'Cultural Tradition',
        state: tradition ? tradition.state : '',
        category: tradition ? tradition.category : '',
        image: tradition ? tradition.image : '',
      });

      return res.json({ success: true, isLiveDatabase: true, saved: true, data: created });
    }

    // Offline Demo Mode
    const result = demoStore.toggleSavedCulture(userId, traditionId);
    res.json({
      success: true,
      isLiveDatabase: false,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSavedCultures,
  toggleSavedCulture,
};
