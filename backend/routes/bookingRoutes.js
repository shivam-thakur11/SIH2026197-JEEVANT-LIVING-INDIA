const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking,
} = require('../controllers/bookingController');

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.patch('/:id/cancel', cancelBooking);

module.exports = router;
