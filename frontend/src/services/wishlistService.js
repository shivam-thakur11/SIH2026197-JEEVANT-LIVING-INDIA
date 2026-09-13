import api from './api';

/**
 * Wishlist Service
 * Communicates with /api/wishlist
 */

export const getWishlist = async (userId, params = {}) => {
  const q = new URLSearchParams({ ...params, userId: userId || '' }).toString();
  return await api.get(`/wishlist?${q}`);
};

export const toggleWishlist = async (userId, productId) => {
  return await api.post('/wishlist/toggle', { userId, productId });
};

export const clearWishlist = async (userId) => {
  return await api.delete(`/wishlist?userId=${userId}`);
};

export default {
  getWishlist,
  toggleWishlist,
  clearWishlist,
};
