const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

const JWT_SECRET = process.env.JWT_SECRET || 'jeevant_super_secure_jwt_secret_sih2026_heritage_culture_portal';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generates a JWT token for a given user.
 */
const generateToken = (user) => {
  const userId = user._id ? user._id.toString() : user.id;
  return jwt.sign(
    {
      id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * POST /api/auth/register
 * Creates a new user account.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next(new AppError('Please provide name, email, and password.', 400));
    }

    const allowedRoles = ['learner', 'artisan'];
    const userRole = allowedRoles.includes(role) ? role : 'learner';

    // Live MongoDB persistence
    if (isDBConnected()) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new AppError('An account with this email already exists.', 400));
      }
      const user = await User.create({ name, email, password, role: userRole });
      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // Offline Demo Mode
    const existingDemoUser = demoStore.getUserByEmail(email);
    if (existingDemoUser) {
      return next(new AppError('An account with this email already exists.', 400));
    }

    const newDemoUser = {
      _id: `user-${Date.now()}`,
      id: `user-${Date.now()}`,
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      role: userRole,
      isActive: true,
      createdAt: new Date(),
    };
    demoStore.users.push(newDemoUser);
    const token = generateToken(newDemoUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! (Offline Demo Mode)',
      token,
      user: {
        id: newDemoUser.id,
        name: newDemoUser.name,
        email: newDemoUser.email,
        role: newDemoUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Authenticates a user and returns a JWT.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(new AppError('Please provide both email and password.', 400));
    }

    // Live MongoDB check
    if (isDBConnected()) {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return next(new AppError('Invalid email or password.', 401));
      }
      if (!user.isActive) {
        return next(new AppError('Your account has been deactivated. Please contact support.', 403));
      }
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return next(new AppError('Invalid email or password.', 401));
      }

      const token = generateToken(user);
      return res.json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    }

    // Offline / Demo Mode Login
    const demoUser = demoStore.getUserByEmail(email);
    if (!demoUser) {
      return next(new AppError('Invalid email or password.', 401));
    }
    if (!demoUser.isActive) {
      return next(new AppError('Your account has been deactivated.', 403));
    }

    // Compare with hashed password or direct match for known demo seeds
    const isMatch = demoUser.passwordHash
      ? bcrypt.compareSync(password, demoUser.passwordHash)
      : password === 'Admin@12345' || password === 'Learner@12345' || password === 'Artisan@12345';

    if (!isMatch) {
      return next(new AppError('Invalid email or password.', 401));
    }

    const token = generateToken(demoUser);

    res.json({
      success: true,
      message: 'Logged in successfully! (Offline Demo Mode)',
      token,
      isDemoMode: true,
      user: {
        id: demoUser.id || demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        avatar: demoUser.avatar,
        location: demoUser.location,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's profile.
 */
const getMe = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new AppError('User not found.', 404));
      }
      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          location: user.location,
          createdAt: user.createdAt,
        },
      });
    }

    // Offline Demo Mode
    res.json({
      success: true,
      user: {
        id: req.user.id || req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone || '+91 98765 00001',
        avatar: req.user.avatar,
        location: req.user.location || 'Ministry of Culture, New Delhi',
        createdAt: req.user.createdAt || new Date(),
        isDemo: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
