const AppError = require('../utils/AppError');

/**
 * requireRole (authorize) middleware factory
 * Restricts access to one or more user roles.
 * Example: requireRole('admin')
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('User not authenticated.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Forbidden: You do not have permission to perform this action. Required role: ${roles.join(' or ')}`,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  requireRole,
  authorize: requireRole, // Alias for backward compatibility
};
