const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { optionalAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/admin/dashboard — Real platform statistics (public summary + admin audit data if authorized)
router.get('/dashboard', optionalAuth, getDashboardStats);
router.get('/stats', optionalAuth, getDashboardStats);

module.exports = router;
