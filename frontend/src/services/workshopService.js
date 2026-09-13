import api from './api';

/**
 * Workshop Service
 * Full CRUD and enrollment for artisan masterclasses and residencies.
 */

/** Get all workshops — supports filters: mode, status, location, craft, search */
export const getWorkshops = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/workshops${query ? `?${query}` : ''}`);
};

/** Get a single workshop by ID */
export const getWorkshopById = (id) => api.get(`/workshops/${id}`);

/** Create a new workshop (artisan or admin) */
export const createWorkshop = (data) => api.post('/workshops', data);

/** Update a workshop */
export const updateWorkshop = (id, data) => api.put(`/workshops/${id}`, data);

/** Enroll in a workshop */
export const enrollWorkshop = (id) => api.post(`/workshops/${id}/enroll`);

/** Delete a workshop (admin only) */
export const deleteWorkshop = (id) => api.delete(`/workshops/${id}`);

export default {
  getWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  enrollWorkshop,
  deleteWorkshop,
};
