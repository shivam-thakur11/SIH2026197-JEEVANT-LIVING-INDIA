import { api } from './api';

/**
 * Region & State Service
 * Connects Explore and Culture Map directly to /api/regions backed by MongoDB.
 */

/**
 * Fetch all Indian states and Union Territories with dynamic database-computed craft and artisan counts.
 * @param {Object} params - { type: 'STATE'|'UT', zone, search }
 * @returns {Promise<Object>} API response
 */
export const getRegions = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.type && params.type !== 'All') query.append('type', params.type);
  if (params.zone && params.zone !== 'All') query.append('zone', params.zone);
  if (params.search) query.append('search', params.search);

  const qs = query.toString();
  const endpoint = qs ? `/regions?${qs}` : '/regions';
  return api.get(endpoint);
};

/**
 * Fetch single region/state by slug, code, or name with all linked traditions and artisans.
 * @param {string} identifier - e.g. 'uttar-pradesh', 'UP', 'Uttar Pradesh'
 * @returns {Promise<Object>} API response
 */
export const getRegionByIdentifier = async (identifier) => {
  return api.get(`/regions/${encodeURIComponent(identifier)}`);
};

export const createRegion = async (data) => {
  return api.post('/regions', data);
};

export const updateRegion = async (id, data) => {
  return api.put(`/regions/${id}`, data);
};

export const deleteRegion = async (id) => {
  return api.delete(`/regions/${id}`);
};
