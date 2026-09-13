const { requireAuth, protect } = require('./authMiddleware');
const { requireRole, authorize } = require('./roleMiddleware');

module.exports = {
  requireAuth,
  protect,
  requireRole,
  authorize,
};
