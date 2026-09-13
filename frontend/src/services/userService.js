import api from './api';

/**
 * User Service
 * Handles user management operations for cultural enthusiasts and admins.
 */

/** Get all users (Admin only) */
export const getUsers = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/users${query ? `?${query}` : ''}`);
};

/** Get a single user by ID */
export const getUserById = (id) => api.get(`/users/${id}`);

/** Update user (Admin) */
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

/** Delete user (Admin) */
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
