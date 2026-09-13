const Order = require('../models/Order');
const Payment = require('../models/Payment');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/**
 * GET /api/orders
 * Query params: userId, page, limit
 */
const getOrders = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      const { userId, page = 1, limit = 12 } = req.query;

      if (userId) {
        filter.$or = [{ user: userId }, { userId }];
      }

      const p = Math.max(1, parseInt(page, 10) || 1);
      const l = Math.max(1, parseInt(limit, 10) || 12);
      const total = await Order.countDocuments(filter);
      const totalPages = Math.ceil(total / l) || 1;

      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l);

      return res.json({
        success: true,
        isLiveDatabase: true,
        data: orders,
        pagination: { page: p, limit: l, total, totalPages },
      });
    }

    // Offline Demo Mode
    const result = demoStore.getOrders(req.query);
    res.json({
      success: true,
      isLiveDatabase: false,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/:id
 */
const getOrderById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new AppError('Order not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, data: order });
    }

    const order = demoStore.getOrderById(req.params.id);
    if (!order) {
      return next(new AppError('Order not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/orders
 * Creates an e-commerce order and records 0% platform fee DBT payment
 */
const createOrder = async (req, res, next) => {
  try {
    const orderData = { ...req.body };
    const orderNum = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (isDBConnected()) {
      const total = Number(orderData.totalAmount || orderData.subtotal || 0);
      const newOrder = await Order.create({
        ...orderData,
        orderNumber: orderNum,
        subtotal: orderData.subtotal !== undefined ? orderData.subtotal : total,
        totalAmount: total,
        platformFee: 0,
        shippingFee: 0,
        directArtisanPayout: total,
        status: 'processing',
        paymentStatus: 'paid',
      });

      // Create DBT Payment record
      const primaryItem = (newOrder.items && newOrder.items[0]) || {};
      await Payment.create({
        transactionId: `TXN-DBT-${Math.floor(1000 + Math.random() * 9000)}`,
        user: newOrder.user || null,
        artisan: primaryItem.artisan || null,
        artisanName: primaryItem.artisanName || 'Master Craftsperson',
        craft: primaryItem.name || 'Living Craft',
        amount: newOrder.totalAmount,
        grossAmount: `₹${newOrder.totalAmount.toLocaleString('en-IN')}`,
        netPayout: `₹${newOrder.totalAmount.toLocaleString('en-IN')}`,
        payoutMethod: 'Direct DBT / UPI',
        status: 'Disbursed',
        paymentStatus: 'completed',
      });

      return res.status(201).json({ success: true, isLiveDatabase: true, data: newOrder });
    }

    // Offline Demo Mode
    const newOrder = demoStore.createOrder(orderData);
    res.status(201).json({ success: true, isLiveDatabase: false, data: newOrder });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/orders/:id/status
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (isDBConnected()) {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
      if (!order) {
        return next(new AppError('Order not found.', 404));
      }
      return res.json({ success: true, isLiveDatabase: true, data: order });
    }

    const updated = demoStore.updateOrderStatus(req.params.id, status);
    if (!updated) {
      return next(new AppError('Order not found.', 404));
    }
    res.json({ success: true, isLiveDatabase: false, data: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
