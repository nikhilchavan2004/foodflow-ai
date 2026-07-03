import apiClient from './client';

export const authService = {
  register: (userData) =>
    apiClient.post('/auth/register', userData),

  login: (credentials) =>
    apiClient.post('/auth/login', credentials),

  getCurrentUser: () =>
    apiClient.get('/auth/me'),

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};
