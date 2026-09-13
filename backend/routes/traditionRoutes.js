const express = require('express');
const {
  getAllTraditions,
  getTraditionById,
  createTradition,
  updateTradition,
  deleteTradition,
} = require('../controllers/traditionController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public: view traditions
router.get('/', getAllTraditions);
router.get('/:id', getTraditionById);

// Protected: Admin only operations (support PUT and PATCH)
router.post('/', requireAuth, requireRole('admin'), createTradition);
router.put('/:id', requireAuth, requireRole('admin'), updateTradition);
router.patch('/:id', requireAuth, requireRole('admin'), updateTradition);
router.delete('/:id', requireAuth, requireRole('admin'), deleteTradition);

module.exports = router;
