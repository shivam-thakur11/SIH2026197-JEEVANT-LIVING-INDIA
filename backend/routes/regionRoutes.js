const express = require('express');
const {
  getRegions,
  getRegionByIdentifier,
  createRegion,
  updateRegion,
  deleteRegion,
} = require('../controllers/regionController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public: view regions
router.get('/', getRegions);
router.get('/:identifier', getRegionByIdentifier);

// Protected: Admin only operations
router.post('/', requireAuth, requireRole('admin'), createRegion);
router.put('/:id', requireAuth, requireRole('admin'), updateRegion);
router.patch('/:id', requireAuth, requireRole('admin'), updateRegion);
router.delete('/:id', requireAuth, requireRole('admin'), deleteRegion);

module.exports = router;
