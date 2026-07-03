import apiClient from './client';

export const cartService = {
  addToCart: (cartItem) =>
    apiClient.post('/cart/', cartItem),

  getCart: (userId) =>
    apiClient.get(`/cart/${userId}`),

  removeFromCart: (cartItemId) =>
    apiClient.delete(`/cart/${cartItemId}`),
};
