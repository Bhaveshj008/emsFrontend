import api from '../utils/api';
import { setToken, removeToken } from '../utils/auth';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    setToken(token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token } = response.data;
    setToken(token);
    return response.data;
  } catch (error) {
    console.log(error)
    // Detailed error handling
    if (error.response) {
      // Server responded with an error
      throw error.response.data;
    } else if (error.request) {
      // Request made but no response received
      throw { 
        message: 'No response from server', 
        status: 'network_error' 
      };
    } else {
      // Something happened in setting up the request
      throw { 
        message: error.message, 
        status: 'request_error' 
      };
    }
  }
};

export const logout = () => {
  removeToken();
};