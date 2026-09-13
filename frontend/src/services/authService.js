import api from './api';

/**
 * Authentication Service
 * Handles login, register, and token management.
 */

const TOKEN_KEY = 'jeevant_token';
const USER_KEY = 'jeevant_user';

/**
 * Registers a new user.
 * @param {{ name, email, password, role }} userData
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.token) {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  }
  return response;
};

/**
 * Logs in a user.
 * @param {{ email, password }} credentials
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.token) {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  }
  return response;
};

/**
 * Gets the currently logged-in user's profile from the API.
 */
export const getMe = async () => {
  return api.get('/auth/me');
};

/**
 * Logs out by clearing localStorage.
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Returns the stored user object (from localStorage).
 * Does NOT make an API call.
 */
export const getStoredUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Returns the stored JWT token.
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Checks if the user is currently logged in.
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};
