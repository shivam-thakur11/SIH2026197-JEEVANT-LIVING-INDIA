const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

const JWT_SECRET = process.env.JWT_SECRET || 'jeevant_super_secure_jwt_secret_sih2026_heritage_culture_portal';

/**
 * requireAuth (protect) middleware
 * Inspects Authorization: Bearer <token>
 * Verifies JWT and attaches current user to req.user.
 */
const requireAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Authentication required. Please log in.', 401));
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Live MongoDB check
    if (isDBConnected()) {
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError('The user associated with this token no longer exists.', 401));
      }
      if (!currentUser.isActive) {
        return next(new AppError('Your account has been deactivated.', 403));
      }
      req.user = currentUser;
      return next();
    }

    // Offline / Demo Mode check
    const demoUser = demoStore.getUserById(decoded.id) || {
      _id: decoded.id,
      id: decoded.id,
      name: decoded.name || 'Ananya Deshmukh',
      email: decoded.email || 'admin@jeevant.gov.in',
      role: decoded.role || 'admin',
      isActive: true,
      isDemo: true,
    };

    if (!demoUser.isActive) {
      return next(new AppError('Your account has been deactivated.', 403));
    }

    req.user = demoUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token signature. Please log in again.', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Session expired. Please log in again.', 401));
    }
    next(error);
  }
};

/**
 * optionalAuth middleware
 * Attaches req.user if a valid token is provided, without throwing 401 if absent.
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (isDBConnected()) {
      const currentUser = await User.findById(decoded.id);
      req.user = currentUser && currentUser.isActive ? currentUser : null;
      return next();
    }

    const demoUser = demoStore.getUserById(decoded.id) || {
      _id: decoded.id,
      id: decoded.id,
      name: decoded.name || 'Demo User',
      email: decoded.email || 'user@example.com',
      role: decoded.role || 'learner',
      isActive: true,
      isDemo: true,
    };
    req.user = demoUser.isActive ? demoUser : null;
    next();
  } catch {
    req.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  protect: requireAuth, // Alias for backward compatibility
  optionalAuth,
};
