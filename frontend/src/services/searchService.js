import api from './api';

/**
 * Search Service
 * Communicates with backend /api/search
 */

export const search = async (query = '') => {
  const q = encodeURIComponent(query);
  return await api.get(`/search?q=${q}`);
};

export default {
  search,
};
