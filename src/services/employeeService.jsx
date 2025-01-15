import api from '../utils/api';


export const getEmployees = async (params = {}) => {
    try {
      const response = await api.get('/employees', { params });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

export const getEmployeeById = async (id) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employees', employeeData);
    return response.data;
  } catch (error) {
    // Detailed error handling
    if (error.response) {
      // Server responded with an error
      console.error('Server Error:', error.response.data);
      
      // Throw the structured error data
      throw {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.message || 'An error occurred'
      };
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received:', error.request);
      throw {
        message: 'No response from server',
        status: 500
      };
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
      throw {
        message: error.message,
        status: 500
      };
    }
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getEmployeeStats = async () => {
    try {
      const response = await api.get('/employees/stats');
      return response.data;
    } catch (error) {
      console.error('Detailed Error:', error.response || error);
      throw {
        message: error.response?.data?.message || 'Failed to fetch employee stats',
        details: error.response?.data || error.message
      };
    }
  };