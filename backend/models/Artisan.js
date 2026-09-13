const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema(
  {
    // Link to the User account (learner, artisan, or admin)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // Alias for compatibility
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // Basic Identity
    name: {
      type: String,
      required: [true, 'Artisan name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },

    // Location
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true, // e.g. "Madhubani, Bihar"
    },

    // Craft Information
    craft: {
      type: String,
      required: [true, 'Craft type is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true, // e.g. "Traditional Painting", "Textiles & Hand Block"
    },
    description: {
      type: String,
      trim: true,
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    experience: {
      type: String,
      trim: true, // e.g. "38 Years"
    },
    awards: {
      type: String,
      trim: true,
    },

    // GI Tag and Verification
    giTagNumber: {
      type: String,
      trim: true, // e.g. "GI-IN-0012"
    },
    aadhaarVerified: {
      type: Boolean,
      default: false,
    },

    // Admin Verification Status
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'verified'],
      default: 'pending',
    },
    verificationNote: {
      type: String,
      trim: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },

    // Media
    image: {
      type: String,
      default: null,
    },

    // Statistics / Metrics
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    workshopsConducted: {
      type: Number,
      default: 0,
    },
    productsCount: {
      type: Number,
      default: 0,
    },
    sourceName: {
      type: String,
      trim: true,
      default: null,
    },
    sourceUrl: {
      type: String,
      trim: true,
      default: null,
    },
    isDevelopmentSeed: {
      type: Boolean,
      default: false,
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

// Virtual property: status mirrors verificationStatus for frontend table consistency
artisanSchema.virtual('status').get(function () {
  if (this.verificationStatus === 'approved' || this.verificationStatus === 'verified') {
    return 'Verified';
  }
  if (this.verificationStatus === 'rejected') {
    return 'Rejected';
  }
  return 'Pending';
});

// Sync user and userId before save
artisanSchema.pre('save', function (next) {
  if (this.user && !this.userId) {
    this.userId = this.user;
  } else if (this.userId && !this.user) {
    this.user = this.userId;
  }
  next();
});

const Artisan = mongoose.model('Artisan', artisanSchema);

module.exports = Artisan;
