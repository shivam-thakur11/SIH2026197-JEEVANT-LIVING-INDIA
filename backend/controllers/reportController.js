const Report = require('../models/Report');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');
const { createNotificationRecord } = require('./notificationController');

/** GET /api/reports — Admin: list reports */
const getAllReports = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      if (req.query.status && req.query.status !== 'All') {
        filter.status = new RegExp(req.query.status, 'i');
      }
      if (req.query.type) {
        filter.type = req.query.type;
      }
      if (req.query.search) {
        const regex = new RegExp(req.query.search, 'i');
        filter.$or = [
          { targetId: regex },
          { targetTitle: regex },
          { reason: regex },
          { description: regex },
          { reportedByName: regex },
        ];
      }

      const reports = await Report.find(filter)
        .populate('reportedBy', 'name email')
        .populate('resolvedBy', 'name email')
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        count: reports.length,
        isLiveDatabase: true,
        data: reports,
      });
    }

    // Offline Demo Mode
    const reports = demoStore.getReports(req.query);
    res.json({
      success: true,
      count: reports.length,
      isLiveDatabase: false,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/reports/:id */
const getReportById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const report = await Report.findById(req.params.id)
        .populate('reportedBy')
        .populate('resolvedBy');
      if (!report) return next(new AppError('Report not found.', 404));
      return res.json({ success: true, isLiveDatabase: true, data: report });
    }

    // Offline Demo Mode
    const report = demoStore.getReportById(req.params.id);
    if (!report) return next(new AppError('Report not found.', 404));
    res.json({ success: true, isLiveDatabase: false, data: report });
  } catch (error) {
    next(error);
  }
};

/** POST /api/reports — Any authenticated user can submit a report */
const createReport = async (req, res, next) => {
  try {
    const reportData = {
      ...req.body,
      reportedBy: req.user ? req.user._id || req.user.id : null,
      reportedByName: req.user ? req.user.name : req.body.reportedByName || 'Cultural Patron',
    };

    if (isDBConnected()) {
      const report = await Report.create(reportData);
      return res.status(201).json({
        success: true,
        message: 'Grievance / audit report submitted successfully.',
        isLiveDatabase: true,
        data: report,
      });
    }

    // Offline Demo Mode
    const report = demoStore.createReport(reportData);
    res.status(201).json({
      success: true,
      message: 'Grievance / audit report submitted successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/reports/:id & PATCH /api/reports/:id — Admin: update report status */
const updateReport = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!report) return next(new AppError('Report not found.', 404));
      return res.json({
        success: true,
        message: 'Report status updated successfully.',
        isLiveDatabase: true,
        data: report,
      });
    }

    // Offline Demo Mode
    const report = demoStore.getReportById(req.params.id);
    if (!report) return next(new AppError('Report not found.', 404));
    Object.assign(report, req.body);
    res.json({
      success: true,
      message: 'Report status updated successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

/** PATCH /api/reports/:id/resolve & PUT /api/reports/:id/resolve — Admin: resolve a report */
const resolveReport = async (req, res, next) => {
  try {
    const note = req.body.note || 'Audit resolved by nodal officer.';

    if (isDBConnected()) {
      const report = await Report.findByIdAndUpdate(
        req.params.id,
        {
          status: 'resolved',
          resolvedBy: req.user ? req.user._id || req.user.id : null,
          resolutionNote: note,
          resolvedAt: new Date(),
        },
        { new: true }
      );
      if (!report) return next(new AppError('Report not found.', 404));

      // Trigger notification
      createNotificationRecord({
        recipientRole: 'admin',
        type: 'report',
        title: 'Heritage Report Resolved',
        message: `Report #${report._id || report.id} (${report.targetTitle || 'Audit Item'}) resolved: ${note}`,
        relatedEntity: 'Report',
        relatedEntityId: report._id,
      }).catch((e) => console.error('Notif error:', e.message));

      return res.json({
        success: true,
        message: 'Report resolved and logged in audit registry.',
        isLiveDatabase: true,
        data: report,
      });
    }

    // Offline Demo Mode
    const report = demoStore.resolveReport(req.params.id, note);
    if (!report) return next(new AppError('Report not found.', 404));
    res.json({
      success: true,
      message: 'Report resolved and logged in audit registry. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

/** PATCH /api/reports/:id/dismiss & PUT /api/reports/:id/dismiss — Admin: dismiss a report */
const dismissReport = async (req, res, next) => {
  try {
    const note = req.body.note || 'Report dismissed as non-actionable.';

    if (isDBConnected()) {
      const report = await Report.findByIdAndUpdate(
        req.params.id,
        {
          status: 'dismissed',
          resolvedBy: req.user ? req.user._id || req.user.id : null,
          resolutionNote: note,
          resolvedAt: new Date(),
        },
        { new: true }
      );
      if (!report) return next(new AppError('Report not found.', 404));
      return res.json({
        success: true,
        message: 'Report dismissed.',
        isLiveDatabase: true,
        data: report,
      });
    }

    // Offline Demo Mode
    const report = demoStore.dismissReport(req.params.id, note);
    if (!report) return next(new AppError('Report not found.', 404));
    res.json({
      success: true,
      message: 'Report dismissed. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/reports/:id — Admin */
const deleteReport = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const report = await Report.findByIdAndDelete(req.params.id);
      if (!report) return next(new AppError('Report not found.', 404));
      return res.json({
        success: true,
        message: 'Report deleted.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const deleted = demoStore.deleteReport(req.params.id);
    if (!deleted) return next(new AppError('Report not found.', 404));
    res.json({
      success: true,
      message: 'Report deleted. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  resolveReport,
  dismissReport,
  deleteReport,
};
