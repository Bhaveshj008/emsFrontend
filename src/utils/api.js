import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'https://emsbackend-kappa.vercel.app/api/';

const api = axios.create({
  baseURL: API_URL
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;