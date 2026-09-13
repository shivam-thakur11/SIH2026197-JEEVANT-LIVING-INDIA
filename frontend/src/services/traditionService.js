import api from './api';

/**
 * Tradition Service
 * Full CRUD for GI-tagged folk traditions and heritage repository.
 */

/** Get all traditions — supports search, state, category, tags */
export const getTraditions = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/traditions${query ? `?${query}` : ''}`);
};

/** Get a single tradition by ID */
export const getTraditionById = (id) => api.get(`/traditions/${id}`);

/** Create a tradition (Admin only) */
export const createTradition = (data) => api.post('/traditions', data);

/** Update a tradition (Admin only) */
export const updateTradition = (id, data) => api.put(`/traditions/${id}`, data);

/** Delete a tradition (Admin only) */
export const deleteTradition = (id) => api.delete(`/traditions/${id}`);

export default {
  getTraditions,
  getTraditionById,
  createTradition,
  updateTradition,
  deleteTradition,
};
