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
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public routes — browse verified artisans
router.get('/', getAllArtisans);
router.get('/:id', getArtisanById);

// Protected: Artisan or admin can register/apply
router.post('/', requireAuth, requireRole('artisan', 'admin'), createArtisan);

// Protected: Admin only operations (support both PUT and PATCH)
router.put('/:id', requireAuth, requireRole('admin'), updateArtisan);
router.patch('/:id', requireAuth, requireRole('admin'), updateArtisan);

router.put('/:id/approve', requireAuth, requireRole('admin'), approveArtisan);
router.patch('/:id/approve', requireAuth, requireRole('admin'), approveArtisan);

router.put('/:id/reject', requireAuth, requireRole('admin'), rejectArtisan);
router.patch('/:id/reject', requireAuth, requireRole('admin'), rejectArtisan);

router.delete('/:id', requireAuth, requireRole('admin'), deleteArtisan);

module.exports = router;
