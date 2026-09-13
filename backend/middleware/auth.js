const { requireAuth, protect, optionalAuth } = require('./authMiddleware');
const { requireRole, authorize } = require('./roleMiddleware');

module.exports = {
  requireAuth,
  protect,
  optionalAuth,
  requireRole,
  authorize,
};
