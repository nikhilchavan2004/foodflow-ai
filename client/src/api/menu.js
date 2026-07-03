import apiClient from './client';

export const menuService = {
  getAllMenuItems: () =>
    apiClient.get('/menu/'),

  getMenuItemById: (itemId) =>
    apiClient.get(`/menu/${itemId}`),

  createMenuItem: (itemData) =>
    apiClient.post('/menu/', itemData),

  updateMenuItem: (itemId, itemData) =>
    apiClient.put(`/menu/${itemId}`, itemData),

  deleteMenuItem: (itemId) =>
    apiClient.delete(`/menu/${itemId}`),
};
