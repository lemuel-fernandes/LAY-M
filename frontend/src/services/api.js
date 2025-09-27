// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // You might want to redirect to login page here
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API methods that match your backend
export const apiService = {
  // Test connection
  testConnection: async () => {
    const response = await api.get('/');
    return response.data;
  },

  // Database status
  getDbStatus: async () => {
    const response = await api.get('/api/v1/db/status');
    return response.data;
  },

  // Auth endpoints (replace with your actual auth routes)
  login: async (credentials) => {
    const response = await api.post('/api/v1/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
    }
    return response.data;
  },

  // Protected endpoints (these require auth token)
  getCurrentUser: async () => {
    const response = await api.get('/api/v1/users/me');
    return response.data;
  },

  getTasks: async () => {
    const response = await api.get('/api/v1/tasks');
    return response.data;
  },

  // Add more methods based on your backend routes
  // For example, if you have other endpoints, add them here
};

export default api;