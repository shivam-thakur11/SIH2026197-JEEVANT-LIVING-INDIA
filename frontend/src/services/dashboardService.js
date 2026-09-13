import api from './api';

/**
 * Dashboard Service
 * Fetches real computed platform statistics from MongoDB.
 */

export const getDashboardStats = () => api.get('/admin/dashboard');

export default {
  getDashboardStats,
};
