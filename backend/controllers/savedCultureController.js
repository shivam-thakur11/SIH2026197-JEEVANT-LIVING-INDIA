const mongoose = require('mongoose');
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
        if (mongoose.Types.ObjectId.isValid(userId)) {
          filter.$or = [{ user: userId }, { userId: String(userId) }];
        } else {
          filter.userId = String(userId);
        }
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
      const isUserObj = mongoose.Types.ObjectId.isValid(userId);
      const isTradObj = mongoose.Types.ObjectId.isValid(traditionId);

      const findQuery = {
        $or: [
          { userId: String(userId), traditionId: String(traditionId) },
          ...(isUserObj && isTradObj ? [{ user: userId, tradition: traditionId }] : []),
        ],
      };

      const existing = await SavedCulture.findOne(findQuery);

      if (existing) {
        await SavedCulture.findByIdAndDelete(existing._id);
        return res.json({ success: true, isLiveDatabase: true, saved: false, traditionId });
      }

      let tradition = null;
      if (isTradObj) {
        tradition = await Tradition.findById(traditionId);
      }
      if (!tradition) {
        tradition = await Tradition.findOne({ $or: [{ _id: isTradObj ? traditionId : null }, { title: new RegExp(traditionId, 'i') }] });
      }

      const created = await SavedCulture.create({
        user: isUserObj ? userId : null,
        userId: String(userId),
        tradition: isTradObj ? traditionId : null,
        traditionId: String(traditionId),
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
