const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register — Create a new user account
router.post('/register', register);

// POST /api/auth/login — Login and receive a JWT
router.post('/login', login);

// GET /api/auth/me — Get current user's profile (requires JWT)
router.get('/me', protect, getMe);

module.exports = router;
