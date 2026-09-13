const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null means global/broadcast to relevant roles
    },
    recipientRole: {
      type: String,
      enum: ['all', 'admin', 'learner', 'artisan'],
      default: 'all',
    },
    type: {
      type: String,
      enum: ['artisan', 'workshop', 'booking', 'order', 'review', 'report', 'gi', 'masterclass', 'system'],
      default: 'system',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    relatedEntity: {
      type: String,
      enum: ['Artisan', 'Workshop', 'Booking', 'Order', 'Review', 'Report', 'Tradition', null],
      default: null,
    },
    relatedEntityId: {
      type: String,
      default: null,
    },
    isDevelopmentSeed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });
notificationSchema.index({ recipientRole: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
