/**
 * Base API utility
 * =====================================
 * All API calls go through this file.
 * It automatically:
 *   1. Configures the backend base URL using VITE_API_URL (with /api proxy fallback)
 *   2. Attaches the JWT token from localStorage (jeevant_token)
 *   3. Handles JSON parsing and standardized errors uniformly
 * =====================================
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Makes an authenticated API request.
 *
 * @param {string} endpoint - API path e.g. '/artisans'
 * @param {object} options - fetch options (method, body, etc.)
 * @returns {Promise<any>} - Parsed JSON response
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jeevant_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Ensure leading slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = { success: false, message: `Server error (${response.status})` };
  }

  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }

  return data;
};

export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body) => apiRequest(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

export default api;
