const mongoose = require('mongoose');

const savedCultureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    tradition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tradition',
      default: null,
    },
    traditionId: {
      type: String,
      trim: true,
      required: true,
    },
    traditionName: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

savedCultureSchema.index({ userId: 1, traditionId: 1 }, { unique: true });

module.exports = mongoose.model('SavedCulture', savedCultureSchema);
