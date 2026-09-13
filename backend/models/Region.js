const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'State / Region name is required'],
      unique: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['STATE', 'UT'],
      required: [true, 'Region type (STATE or UT) is required'],
      default: 'STATE',
    },
    code: {
      type: String,
      required: [true, 'Region code (e.g. UP, RJ, KL) is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    capital: {
      type: String,
      required: true,
      trim: true,
    },
    zone: {
      type: String,
      enum: ['North', 'South', 'East', 'West', 'Central', 'North-East', 'Islands', 'Pan-India'],
      required: true,
      default: 'North',
    },
    description: {
      type: String,
      required: true,
      maxlength: [4000, 'Description cannot exceed 4000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [500, 'Short description cannot exceed 500 characters'],
    },
    heroImage: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    heroImageSource: {
      type: String,
      trim: true,
      default: 'Unsplash / Open Cultural Archives',
    },
    heroImageAttribution: {
      type: String,
      trim: true,
    },
    culturalHighlights: {
      type: [String],
      default: [],
    },
    majorCrafts: {
      type: [String],
      default: [],
    },
    heritageSites: {
      type: [String],
      default: [],
    },
    famousFestivals: {
      type: [String],
      default: [],
    },
    sourceReferences: [
      {
        sourceName: { type: String, required: true },
        sourceUrl: { type: String },
        sourceType: {
          type: String,
          enum: ['government_registry', 'unesco', 'state_portal', 'museum_archive', 'academic_research'],
          default: 'government_registry',
        },
        attribution: { type: String },
        verified: { type: Boolean, default: true },
      },
    ],
    verificationStatus: {
      type: String,
      enum: ['Source Referenced', 'Pending Verification', 'Community Submitted', 'Verified by Authority'],
      default: 'Source Referenced',
    },
    isDevelopmentSeed: {
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

// Auto-generate slug from name if not provided
regionSchema.pre('save', function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;
