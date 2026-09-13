const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');

/**
 * Internal helper to create a database-backed notification from any controller
 */
const createNotificationRecord = async ({
  recipient = null,
  recipientRole = 'all',
  type = 'system',
  title,
  message,
  relatedEntity = null,
  relatedEntityId = null,
  isDevelopmentSeed = false,
}) => {
  if (!isDBConnected()) return null;
  try {
    const notif = await Notification.create({
      recipient,
      recipientRole,
      type,
      title,
      message,
      relatedEntity,
      relatedEntityId: relatedEntityId ? String(relatedEntityId) : null,
      isDevelopmentSeed,
    });
    return notif;
  } catch (err) {
    console.error('Error creating notification record:', err.message);
    return null;
  }
};

/**
 * GET /api/notifications
 * Query: role, recipient, unreadOnly, page, limit
 */
const getNotifications = async (req, res, next) => {
  try {
    const { role, recipient, unreadOnly, page = 1, limit = 20 } = req.query;

    if (isDBConnected()) {
      const filter = {};

      if (role && role !== 'all') {
        filter.$or = [{ recipientRole: 'all' }, { recipientRole: role }];
      }

      if (recipient) {
        if (mongoose.Types.ObjectId.isValid(recipient)) {
          filter.$or = [
            { recipient: new mongoose.Types.ObjectId(recipient) },
            { recipient: null },
          ];
        }
      }

      if (unreadOnly === 'true') {
        filter.read = false;
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 20);

      const [total, unreadCount, notifications] = await Promise.all([
        Notification.countDocuments(filter),
        Notification.countDocuments({ ...filter, read: false }),
        Notification.find(filter)
          .sort({ createdAt: -1 })
          .skip((p - 1) * l)
          .limit(l),
      ]);

      return res.json({
        success: true,
        isLiveDatabase: true,
        unreadCount,
        data: notifications,
        pagination: {
          page: p,
          limit: l,
          total,
          totalPages: Math.ceil(total / l) || 1,
        },
      });
    }

    // Offline demo fallback
    return res.json({
      success: true,
      isLiveDatabase: false,
      unreadCount: 0,
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/notifications/:id/read
 */
const markNotificationRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid notification ID', 400));
      }

      const updated = await Notification.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );

      if (!updated) {
        return next(new AppError('Notification not found', 404));
      }

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: updated,
      });
    }

    return res.json({
      success: true,
      isLiveDatabase: false,
      message: 'Notification marked read in demo mode',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/notifications/read-all
 */
const markAllRead = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (isDBConnected()) {
      const filter = { read: false };
      if (role && role !== 'all') {
        filter.$or = [{ recipientRole: 'all' }, { recipientRole: role }];
      }

      await Notification.updateMany(filter, { read: true });

      return res.json({
        success: true,
        isLiveDatabase: true,
        message: 'All notifications marked as read',
      });
    }

    return res.json({
      success: true,
      isLiveDatabase: false,
      message: 'All notifications marked as read in demo mode',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/notifications
 * Dispatch a notification (admin or system)
 */
const createNotification = async (req, res, next) => {
  try {
    const { recipient, recipientRole, type, title, message, relatedEntity, relatedEntityId } = req.body;

    if (!title || !message) {
      return next(new AppError('Title and message are required.', 400));
    }

    if (isDBConnected()) {
      const notif = await createNotificationRecord({
        recipient: mongoose.Types.ObjectId.isValid(recipient) ? recipient : null,
        recipientRole: recipientRole || 'all',
        type: type || 'system',
        title,
        message,
        relatedEntity,
        relatedEntityId,
      });

      return res.status(201).json({
        success: true,
        isLiveDatabase: true,
        data: notif,
      });
    }

    return res.status(201).json({
      success: true,
      isLiveDatabase: false,
      data: { title, message, read: false, createdAt: new Date() },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotificationRecord,
  getNotifications,
  markNotificationRead,
  markAllRead,
  createNotification,
};
