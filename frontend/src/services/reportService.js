import api from './api';

/**
 * Report Service
 * Cultural content moderation and counterfeit/grievance reporting.
 */

/** Get all reports (Admin only) */
export const getReports = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/reports${query ? `?${query}` : ''}`);
};

/** Get a single report by ID */
export const getReportById = (id) => api.get(`/reports/${id}`);

/** Submit a new report */
export const createReport = (data) => api.post('/reports', data);

/** Update report details */
export const updateReport = (id, data) => api.put(`/reports/${id}`, data);

/** Admin: Resolve a report */
export const resolveReport = (id, note) => api.patch(`/reports/${id}/resolve`, { note });

/** Admin: Dismiss a report */
export const dismissReport = (id, note) => api.patch(`/reports/${id}/dismiss`, { note });

/** Admin: Delete a report */
export const deleteReport = (id) => api.delete(`/reports/${id}`);

export default {
  getReports,
  getReportById,
  createReport,
  updateReport,
  resolveReport,
  dismissReport,
  deleteReport,
};
