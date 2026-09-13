const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/admin/dashboard — Real admin dashboard statistics
router.get('/dashboard', requireAuth, requireRole('admin'), getDashboardStats);

module.exports = router;
