const express = require('express');
const {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  resolveReport,
  dismissReport,
  deleteReport,
} = require('../controllers/reportController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { validate, reportValidation } = require('../validators');

const router = express.Router();

// Any authenticated user can submit a report
router.post('/', requireAuth, validate(reportValidation), createReport);

// All other report routes require admin
router.get('/', requireAuth, requireRole('admin'), getAllReports);
router.get('/:id', requireAuth, requireRole('admin'), getReportById);
router.put('/:id', requireAuth, requireRole('admin'), updateReport);
router.patch('/:id', requireAuth, requireRole('admin'), updateReport);

// Support both PUT and PATCH for resolve/dismiss
router.put('/:id/resolve', requireAuth, requireRole('admin'), resolveReport);
router.patch('/:id/resolve', requireAuth, requireRole('admin'), resolveReport);

router.put('/:id/dismiss', requireAuth, requireRole('admin'), dismissReport);
router.patch('/:id/dismiss', requireAuth, requireRole('admin'), dismissReport);

router.delete('/:id', requireAuth, requireRole('admin'), deleteReport);

module.exports = router;
