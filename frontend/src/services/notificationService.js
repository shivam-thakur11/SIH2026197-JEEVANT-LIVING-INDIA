import api from './api';

/**
 * Notification Service
 * Communicates with /api/notifications
 */

export const getNotifications = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/notifications?${query}` : '/notifications';
  return await api.get(endpoint);
};

export const markNotificationRead = async (id) => {
  return await api.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsRead = async (role = 'all') => {
  return await api.patch('/notifications/read-all', { role });
};

export const createNotification = async (data) => {
  return await api.post('/notifications', data);
};

export default {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createNotification,
};
