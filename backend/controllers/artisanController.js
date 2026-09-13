const Artisan = require('../models/Artisan');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');
const { createNotificationRecord } = require('./notificationController');

/**
 * GET /api/artisans
 * Returns all artisans. Supports query filters: status, state, craft, search
 */
const getAllArtisans = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      const { status, state, craft, giOnly, search, page = 1, limit = 12 } = req.query;

      if (status && status !== 'All') {
        const statusLower = status.toLowerCase();
        if (statusLower === 'verified' || statusLower === 'approved') {
          filter.verificationStatus = { $in: ['approved', 'verified'] };
        } else {
          filter.verificationStatus = statusLower;
        }
      }

      if (state && state !== 'All') {
        filter.state = new RegExp(state, 'i');
      }

      if (craft && craft !== 'All') {
        filter.craft = new RegExp(craft, 'i');
      }

      if (giOnly === 'true' || giOnly === true) {
        filter.giTagNumber = { $exists: true, $ne: '' };
      }

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        filter.$or = [
          { name: searchRegex },
          { craft: searchRegex },
          { description: searchRegex },
          { state: searchRegex },
          { city: searchRegex },
          { region: searchRegex },
          { giTagNumber: searchRegex },
        ];
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 12);
      const total = await Artisan.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      const artisans = await Artisan.find(filter)
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        count: artisans.length,
        isLiveDatabase: true,
        data: artisans,
        pagination: { page: p, limit: l, total, totalPages },
      });
    }

    // Offline / Demo Mode
    const result = demoStore.getArtisans(req.query);
    const artisans = Array.isArray(result) ? result : result.data;
    const pagination = result.pagination || { page: 1, limit: artisans.length, total: artisans.length, totalPages: 1 };

    res.json({
      success: true,
      count: artisans.length,
      isLiveDatabase: false,
      data: artisans,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artisans/:id
 * Returns a single artisan by ID.
 */
const getArtisanById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const artisan = await Artisan.findById(req.params.id).populate('user userId', 'name email');
      if (!artisan) {
        return next(new AppError('Artisan not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, data: artisan });
    }

    // Offline Demo Mode
    const artisan = demoStore.getArtisanById(req.params.id);
    if (!artisan) {
      return next(new AppError('Artisan not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: artisan });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/artisans
 * Creates a new artisan profile/application.
 */
const createArtisan = async (req, res, next) => {
  try {
    const cleanName = (req.body.name || 'artisan').toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = req.body.email || req.body.contactEmail || (req.user && req.user.email) || `${cleanName || 'artisan'}@jeevant.org`;
    const artisanData = {
      ...req.body,
      email,
      contactEmail: email,
      verificationStatus: req.body.verificationStatus || 'pending',
      user: req.user ? req.user._id || req.user.id : req.body.user,
      userId: req.user ? req.user._id || req.user.id : req.body.userId,
    };

    if (isDBConnected()) {
      const artisan = await Artisan.create(artisanData);

      // Trigger real notification for admin audit
      createNotificationRecord({
        recipientRole: 'admin',
        type: 'artisan',
        title: 'New Artisan Verification Request',
        message: `${artisan.name} submitted GI registration credentials (${artisan.craft || 'Artisan Craft'}) for verification.`,
        relatedEntity: 'Artisan',
        relatedEntityId: artisan._id,
      }).catch((e) => console.error('Notif error:', e.message));

      return res.status(201).json({
        success: true,
        message: 'Artisan application submitted for verification.',
        isLiveDatabase: true,
        data: artisan,
      });
    }

    // Offline Demo Mode
    const artisan = demoStore.createArtisan(artisanData);
    res.status(201).json({
      success: true,
      message: 'Artisan application submitted for verification. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: artisan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/artisans/:id & PATCH /api/artisans/:id
 * Updates an artisan's details.
 */
const updateArtisan = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const artisan = await Artisan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!artisan) {
        return next(new AppError('Artisan not found.', 404));
      }
      return res.json({
        success: true,
        message: 'Artisan profile updated successfully.',
        isLiveDatabase: true,
        data: artisan,
      });
    }

    // Offline Demo Mode
    const artisan = demoStore.updateArtisan(req.params.id, req.body);
    if (!artisan) {
      return next(new AppError('Artisan not found.', 404));
    }
    res.json({
      success: true,
      message: 'Artisan profile updated successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: artisan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/artisans/:id/approve & PATCH /api/artisans/:id/approve
 * Admin approval: sets verificationStatus = "approved"
 */
const approveArtisan = async (req, res, next) => {
  try {
    const note = req.body.note || 'Verified & approved by nodal admin.';

    if (isDBConnected()) {
      const artisan = await Artisan.findByIdAndUpdate(
        req.params.id,
        {
          verificationStatus: 'approved',
          verifiedBy: req.user ? req.user._id || req.user.id : null,
          verifiedAt: new Date(),
          verificationNote: note,
        },
        { new: true }
      );
      if (!artisan) {
        return next(new AppError('Artisan not found.', 404));
      }

      // Trigger notification for learners and admin
      createNotificationRecord({
        recipientRole: 'all',
        type: 'artisan',
        title: 'Master Artisan Verified',
        message: `Master Artisan ${artisan.name} (${artisan.craft || 'Traditional Craft'}) has been verified and registered.`,
        relatedEntity: 'Artisan',
        relatedEntityId: artisan._id,
      }).catch((e) => console.error('Notif error:', e.message));

      return res.json({
        success: true,
        message: `Master Artisan "${artisan.name}" has been approved and GI verified.`,
        isLiveDatabase: true,
        data: artisan,
      });
    }

    // Offline Demo Mode
    const artisan = demoStore.approveArtisan(req.params.id, note);
    if (!artisan) {
      return next(new AppError('Artisan not found.', 404));
    }
    res.json({
      success: true,
      message: `Master Artisan "${artisan.name}" has been approved and GI verified. (Offline Demo Mode)`,
      isLiveDatabase: false,
      data: artisan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/artisans/:id/reject & PATCH /api/artisans/:id/reject
 * Admin rejection: sets verificationStatus = "rejected"
 */
const rejectArtisan = async (req, res, next) => {
  try {
    const note = req.body.note || 'Application rejected by admin audit.';

    if (isDBConnected()) {
      const artisan = await Artisan.findByIdAndUpdate(
        req.params.id,
        {
          verificationStatus: 'rejected',
          verifiedBy: req.user ? req.user._id || req.user.id : null,
          verifiedAt: new Date(),
          verificationNote: note,
        },
        { new: true }
      );
      if (!artisan) {
        return next(new AppError('Artisan not found.', 404));
      }
      return res.json({
        success: true,
        message: `Application for "${artisan.name}" has been marked as rejected.`,
        isLiveDatabase: true,
        data: artisan,
      });
    }

    // Offline Demo Mode
    const artisan = demoStore.rejectArtisan(req.params.id, note);
    if (!artisan) {
      return next(new AppError('Artisan not found.', 404));
    }
    res.json({
      success: true,
      message: `Application for "${artisan.name}" has been marked as rejected. (Offline Demo Mode)`,
      isLiveDatabase: false,
      data: artisan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/artisans/:id
 * Deletes an artisan record. Admin only.
 */
const deleteArtisan = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const artisan = await Artisan.findByIdAndDelete(req.params.id);
      if (!artisan) {
        return next(new AppError('Artisan not found.', 404));
      }
      return res.json({
        success: true,
        message: 'Artisan record deleted successfully.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const deleted = demoStore.deleteArtisan(req.params.id);
    if (!deleted) {
      return next(new AppError('Artisan not found.', 404));
    }
    res.json({
      success: true,
      message: 'Artisan record deleted successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  approveArtisan,
  rejectArtisan,
  deleteArtisan,
};
