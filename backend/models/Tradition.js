const mongoose = require('mongoose');

const traditionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    // Alias name for backward compatibility
    name: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true, // e.g. "Folk Art & Wall Fresco", "Non-Clay Quartz Ceramics"
    },
    description: {
      type: String,
      trim: true,
      maxlength: [4000, 'Description cannot exceed 4000 characters'],
    },
    history: {
      type: String,
      trim: true,
      maxlength: [4000, 'History cannot exceed 4000 characters'],
    },
    tags: {
      type: [String],
      default: [],
    },

    // Heritage Metadata
    giStatus: {
      type: String,
      trim: true, // e.g. "Registered GI-IN-0012"
    },
    unescoStatus: {
      type: String,
      trim: true,
    },
    riskLevel: {
      type: String,
      trim: true, // e.g. "Stable & Thriving", "Vulnerable", "Critically Endangered"
      default: 'Stable & Thriving',
    },
    activeArtisans: {
      type: String,
      trim: true,
    },
    antiquity: {
      type: String,
      trim: true,
    },
    materials: {
      type: String,
      trim: true,
    },

    // Media
    image: {
      type: String,
      default: null,
    },

    // Status: published or draft
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

// Ensure title and name stay in sync
traditionSchema.pre('save', function (next) {
  if (this.title && !this.name) {
    this.name = this.title;
  } else if (this.name && !this.title) {
    this.title = this.name;
  }
  next();
});

const Tradition = mongoose.model('Tradition', traditionSchema);

module.exports = Tradition;
