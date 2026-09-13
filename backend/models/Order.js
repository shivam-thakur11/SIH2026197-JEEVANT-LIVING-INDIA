const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    productId: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    image: {
      type: String,
    },
    artisanName: {
      type: String,
    },
    artisanId: {
      type: String,
    },
    state: {
      type: String,
    },
    giTag: {
      type: String,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userId: {
      type: String,
      trim: true,
      default: null,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    userEmail: {
      type: String,
      trim: true,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g. "ORD-2026-9182"
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(val) => val.length > 0, 'Order must contain at least one item'],
    },
    itemsCount: {
      type: Number,
      default: 1,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    platformFee: {
      type: Number,
      default: 0, // 0% SIH Commission Model
    },
    shippingFee: {
      type: Number,
      default: 0, // Free fair-trade delivery
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    directArtisanPayout: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      fullName: { type: String, trim: true },
      addressLine: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
    paymentMethod: {
      type: String,
      default: 'Direct DBT / UPI',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'paid',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
