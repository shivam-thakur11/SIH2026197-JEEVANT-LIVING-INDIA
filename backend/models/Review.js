const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    // Reviewer user reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewerName: {
      type: String,
      trim: true,
    },

    // Target artisan, workshop, or product
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      default: null,
    },
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop',
      default: null,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    productId: {
      type: String,
      trim: true,
      default: null,
    },
    target: {
      type: String,
      trim: true,
      default: 'Cultural Masterclass',
    },

    // Rating & Content
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: [3000, 'Comment cannot exceed 3000 characters'],
    },

    // AI sentiment (assistive signal)
    sentiment: {
      type: String,
      default: null, // e.g. "Positive (98%)"
    },

    // Status: published, flagged, removed
    status: {
      type: String,
      enum: ['published', 'flagged', 'removed', 'Published', 'Flagged'],
      default: 'published',
    },
    flaggedReason: {
      type: String,
      trim: true,
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

// Sync user and reviewer fields
reviewSchema.pre('save', function (next) {
  if (this.user && !this.reviewer) this.reviewer = this.user;
  if (this.reviewer && !this.user) this.user = this.reviewer;
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
