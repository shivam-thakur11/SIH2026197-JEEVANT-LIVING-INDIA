import api from './api';

/**
 * Product Service
 * Communicates with backend /api/products
 */

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/products?${query}` : '/products';
  return await api.get(endpoint);
};

export const getProductById = async (id) => {
  return await api.get(`/products/${id}`);
};

export const createProduct = async (data) => {
  return await api.post('/products', data);
};

export const updateProduct = async (id, data) => {
  return await api.put(`/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
