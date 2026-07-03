import apiClient from './client';

export const ordersService = {
  createOrder: (orderData) =>
    apiClient.post('/orders/', orderData),

  getAllOrders: () =>
    apiClient.get('/orders/'),

  getUserOrders: (userId) =>
    apiClient.get(`/orders/user/${userId}`),

  updateOrderStatus: (orderId, status) =>
    apiClient.put(`/orders/${orderId}/status`, { status }),
};
