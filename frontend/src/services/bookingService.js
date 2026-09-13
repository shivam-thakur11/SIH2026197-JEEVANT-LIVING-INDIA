import api from './api';

/**
 * Booking Service
 * Communicates with backend /api/bookings
 */

export const getBookings = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/bookings?${query}` : '/bookings';
  return await api.get(endpoint);
};

export const getBookingById = async (id) => {
  return await api.get(`/bookings/${id}`);
};

export const createBooking = async (data) => {
  return await api.post('/bookings', data);
};

export const cancelBooking = async (id) => {
  return await api.patch(`/bookings/${id}/cancel`);
};

export default {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking,
};
