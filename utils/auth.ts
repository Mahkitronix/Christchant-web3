import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const authService = {
  // Login function
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error.response?.data?.message || 'Failed to login';
    }
  },

  // Registration function
  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error.response?.data?.message || 'Failed to register';
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};