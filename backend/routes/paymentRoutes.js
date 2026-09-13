const express = require('express');
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Authenticated users can record a payment
router.post('/', requireAuth, createPayment);

// Ledger review and administration requires admin role
router.get('/', requireAuth, requireRole('admin'), getAllPayments);
router.get('/:id', requireAuth, requireRole('admin'), getPaymentById);
router.put('/:id', requireAuth, requireRole('admin'), updatePayment);
router.patch('/:id', requireAuth, requireRole('admin'), updatePayment);
router.delete('/:id', requireAuth, requireRole('admin'), deletePayment);

module.exports = router;
