const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate, registerValidation, loginValidation } = require('../validators');

const router = express.Router();

// POST /api/auth/register — Create a new user account
router.post('/register', validate(registerValidation), register);

// POST /api/auth/login — Login and receive a JWT
router.post('/login', validate(loginValidation), login);

// GET /api/auth/me — Get current user's profile (requires JWT)
router.get('/me', protect, getMe);

module.exports = router;
