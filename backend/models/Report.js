const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    // Who filed this report
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reportedByName: {
      type: String,
      trim: true,
      default: 'Cultural Patron',
    },

    // Type of entity reported: artisan, workshop, review, tradition, user
    type: {
      type: String,
      enum: ['artisan', 'workshop', 'review', 'tradition', 'user'],
      default: 'artisan',
    },
    targetType: {
      type: String,
      enum: ['artisan', 'workshop', 'review', 'tradition', 'user'],
      default: 'artisan',
    },

    // Target ID or title
    targetId: {
      type: String,
      required: [true, 'Target ID is required'],
      trim: true,
    },
    targetTitle: {
      type: String,
      trim: true,
    },

    reason: {
      type: String,
      required: [true, 'Report reason is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },

    // Status: open, under_review, resolved, dismissed
    status: {
      type: String,
      enum: ['open', 'under_review', 'resolved', 'dismissed', 'Pending Audit', 'Resolved', 'Dismissed'],
      default: 'open',
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    resolutionNote: {
      type: String,
      trim: true,
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    isDemoData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reportSchema.pre('save', function (next) {
  if (this.type && !this.targetType) this.targetType = this.type;
  if (this.targetType && !this.type) this.type = this.targetType;
  next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
