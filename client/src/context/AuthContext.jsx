import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (restore from localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      const { access_token } = response.data;

      // Decode JWT to get user info (basic decode)
      const base64Url = access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userData = JSON.parse(jsonPayload);

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));

      setToken(access_token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register({
        full_name: fullName,
        email,
        password,
      });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
