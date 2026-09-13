import api from './api';

/**
 * Artisan Service
 * Handles all API calls for artisans registry, GI tags, and verification.
 */

/** Get all artisans — supports query parameters (status, state, craft, search) */
export const getArtisans = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/artisans${query ? `?${query}` : ''}`);
};

/** Get a single artisan by ID */
export const getArtisanById = (id) => api.get(`/artisans/${id}`);

/** Submit a new artisan application */
export const createArtisan = (data) => api.post('/artisans', data);

/** Update artisan details */
export const updateArtisan = (id, data) => api.put(`/artisans/${id}`, data);

/** Admin: Approve an artisan (sets verificationStatus = "approved") */
export const approveArtisan = (id, note = 'Approved by nodal admin') =>
  api.put(`/artisans/${id}/approve`, { note });

/** Admin: Reject an artisan (sets verificationStatus = "rejected") */
export const rejectArtisan = (id, note = 'Rejected by nodal admin') =>
  api.put(`/artisans/${id}/reject`, { note });

/** Admin: Delete an artisan */
export const deleteArtisan = (id) => api.delete(`/artisans/${id}`);

export default {
  getArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  approveArtisan,
  rejectArtisan,
  deleteArtisan,
};
