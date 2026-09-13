import api from './api';

/**
 * Payment Service
 * Direct DBT Fair-Trade ledger records (0% intermediary commission).
 */

/** Get all payment records (Admin only) */
export const getPayments = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/payments${query ? `?${query}` : ''}`);
};

/** Get a single payment record by ID */
export const getPaymentById = (id) => api.get(`/payments/${id}`);

/** Create a demo payment record */
export const createPayment = (data) => api.post('/payments', data);

/** Update a payment record */
export const updatePayment = (id, data) => api.put(`/payments/${id}`, data);

/** Delete a payment record */
export const deletePayment = (id) => api.delete(`/payments/${id}`);

export default {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
