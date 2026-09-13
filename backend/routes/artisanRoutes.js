const express = require('express');
const {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  approveArtisan,
  rejectArtisan,
  deleteArtisan,
} = require('../controllers/artisanController');
const { requireAuth, optionalAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { validate, artisanValidation } = require('../validators');

const router = express.Router();

// Public routes — browse verified artisans
router.get('/', getAllArtisans);
router.get('/:id', getArtisanById);

// Public / Onboarding: Prospective artisan application or admin creation
router.post('/', optionalAuth, validate(artisanValidation), createArtisan);

// Protected: Admin only operations (support both PUT and PATCH)
router.put('/:id', requireAuth, requireRole('admin'), updateArtisan);
router.patch('/:id', requireAuth, requireRole('admin'), updateArtisan);

router.put('/:id/approve', requireAuth, requireRole('admin'), approveArtisan);
router.patch('/:id/approve', requireAuth, requireRole('admin'), approveArtisan);

router.put('/:id/reject', requireAuth, requireRole('admin'), rejectArtisan);
router.patch('/:id/reject', requireAuth, requireRole('admin'), rejectArtisan);

router.delete('/:id', requireAuth, requireRole('admin'), deleteArtisan);

module.exports = router;
