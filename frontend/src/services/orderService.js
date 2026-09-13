import api from './api';

/**
 * Order Service
 * Communicates with backend /api/orders
 */

export const getOrders = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/orders?${query}` : '/orders';
  return await api.get(endpoint);
};

export const getOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

export const createOrder = async (data) => {
  return await api.post('/orders', data);
};

export const updateOrderStatus = async (id, status) => {
  return await api.patch(`/orders/${id}/status`, { status });
};

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
