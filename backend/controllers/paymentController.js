const Payment = require('../models/Payment');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/** GET /api/payments — Admin: list payments / DBT fair-trade records */
const getAllPayments = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      if (req.query.status && req.query.status !== 'All') {
        filter.$or = [
          { status: new RegExp(req.query.status, 'i') },
          { paymentStatus: new RegExp(req.query.status, 'i') },
        ];
      }
      if (req.query.artisan) {
        filter.artisan = req.query.artisan;
      }
      if (req.query.search) {
        const regex = new RegExp(req.query.search, 'i');
        filter.$or = [
          { transactionId: regex },
          { artisanName: regex },
          { craft: regex },
          { account: regex },
        ];
      }

      const payments = await Payment.find(filter)
        .populate('artisan', 'name craft state')
        .populate('user', 'name email')
        .populate('workshop', 'title')
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        count: payments.length,
        isLiveDatabase: true,
        isDemoPaymentSystem: true,
        note: 'SIH Fair Trade Guarantee: 0% Platform Commission. Live DBT Payment Records.',
        data: payments,
      });
    }

    // Offline Demo Mode
    const payments = demoStore.getPayments(req.query);
    res.json({
      success: true,
      count: payments.length,
      isLiveDatabase: false,
      isDemoPaymentSystem: true,
      note: 'SIH Fair Trade Guarantee: 0% Platform Commission. Demo DBT Payment Records.',
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/payments/:id */
const getPaymentById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const payment = await Payment.findById(req.params.id)
        .populate('artisan')
        .populate('user')
        .populate('workshop');
      if (!payment) return next(new AppError('Payment record not found.', 404));
      return res.json({ success: true, isLiveDatabase: true, isDemoPaymentSystem: true, data: payment });
    }

    // Offline Demo Mode
    const payment = demoStore.getPaymentById(req.params.id);
    if (!payment) return next(new AppError('Payment record not found.', 404));
    res.json({ success: true, isLiveDatabase: false, isDemoPaymentSystem: true, data: payment });
  } catch (error) {
    next(error);
  }
};

/** POST /api/payments — Record demo payment */
const createPayment = async (req, res, next) => {
  try {
    const paymentData = {
      ...req.body,
      isDemoData: true,
      transactionId: req.body.transactionId || `TXN-DBT-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentStatus: req.body.paymentStatus || 'completed',
    };

    if (isDBConnected()) {
      const payment = await Payment.create(paymentData);
      return res.status(201).json({
        success: true,
        message: 'Fair trade payment record created successfully.',
        isLiveDatabase: true,
        data: payment,
      });
    }

    // Offline Demo Mode
    const payment = demoStore.createPayment(paymentData);
    res.status(201).json({
      success: true,
      message: 'Fair trade payment record created successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/payments/:id & PATCH /api/payments/:id — Admin: update payment */
const updatePayment = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!payment) return next(new AppError('Payment record not found.', 404));
      return res.json({
        success: true,
        message: 'Payment status updated.',
        isLiveDatabase: true,
        data: payment,
      });
    }

    // Offline Demo Mode
    const payment = demoStore.getPaymentById(req.params.id);
    if (!payment) return next(new AppError('Payment record not found.', 404));
    Object.assign(payment, req.body);
    res.json({
      success: true,
      message: 'Payment status updated. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/payments/:id — Admin */
const deletePayment = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) return next(new AppError('Payment record not found.', 404));
      return res.json({
        success: true,
        message: 'Payment record deleted.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const idx = demoStore.payments.findIndex(
      (p) => p._id === req.params.id || p.id === req.params.id || p.transactionId === req.params.id
    );
    if (idx === -1) return next(new AppError('Payment record not found.', 404));
    demoStore.payments.splice(idx, 1);
    res.json({
      success: true,
      message: 'Payment record deleted. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
