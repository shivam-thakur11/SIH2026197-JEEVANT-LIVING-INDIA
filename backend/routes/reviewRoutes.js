const express = require('express');
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  toggleReviewStatus,
  deleteReview,
} = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { validate, reviewValidation } = require('../validators');

const router = express.Router();

// Public: view reviews
router.get('/', getAllReviews);
router.get('/:id', getReviewById);

// Protected: submit review (any authenticated user)
router.post('/', requireAuth, validate(reviewValidation), createReview);

// Protected: Admin moderation (support PUT, PATCH, and toggle)
router.put('/:id', requireAuth, requireRole('admin'), updateReview);
router.patch('/:id', requireAuth, requireRole('admin'), updateReview);
router.patch('/:id/toggle-status', requireAuth, requireRole('admin'), toggleReviewStatus);
router.delete('/:id', requireAuth, requireRole('admin'), deleteReview);

module.exports = router;
