// src/utils/api.js or wherever your axiosInstance is defined

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header with Bearer token on every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch 401 or token expiry errors
axiosInstance.interceptors.response.use(
  (response) => response, // If response is fine, just return it
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.data.message === 'Token expired')
    ) {

      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, API_BASE_URL };
