const express = require('express');
const {
  getAllWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  enrollWorkshop,
} = require('../controllers/workshopController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public: view workshops
router.get('/', getAllWorkshops);
router.get('/:id', getWorkshopById);

// Public or learner: enroll in workshop
router.post('/:id/enroll', enrollWorkshop);

// Protected: create workshop (artisan or admin)
router.post('/', requireAuth, requireRole('artisan', 'admin'), createWorkshop);

// Protected: update/delete workshop (admin or artisan)
router.put('/:id', requireAuth, requireRole('artisan', 'admin'), updateWorkshop);
router.patch('/:id', requireAuth, requireRole('artisan', 'admin'), updateWorkshop);
router.delete('/:id', requireAuth, requireRole('admin'), deleteWorkshop);

module.exports = router;
