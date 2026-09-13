import api from './api';

/**
 * Review Service
 * Community reviews and cultural authenticity moderation.
 */

/** Get all reviews — supports search, status, artisan filter */
export const getReviews = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/reviews${query ? `?${query}` : ''}`);
};

/** Get a single review by ID */
export const getReviewById = (id) => api.get(`/reviews/${id}`);

/** Submit a review */
export const createReview = (data) => api.post('/reviews', data);

/** Update review */
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);

/** Admin: Toggle review moderation status (published / flagged) */
export const toggleReviewStatus = (id) => api.patch(`/reviews/${id}/toggle-status`);

/** Admin: Delete an inappropriate review */
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export default {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  toggleReviewStatus,
  deleteReview,
};
