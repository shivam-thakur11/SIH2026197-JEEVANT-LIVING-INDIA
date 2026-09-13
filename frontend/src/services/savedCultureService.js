import api from './api';

/**
 * Saved Culture Service
 * Communicates with backend /api/saved-cultures
 */

export const getSavedCultures = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/saved-cultures?${query}` : '/saved-cultures';
  return await api.get(endpoint);
};

export const toggleSavedCulture = async (userId, traditionId) => {
  return await api.post('/saved-cultures/toggle', { userId, traditionId });
};

export default {
  getSavedCultures,
  toggleSavedCulture,
};
