const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
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
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    productId: {
      type: String,
      trim: true,
      required: true,
    },
    productName: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
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

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
