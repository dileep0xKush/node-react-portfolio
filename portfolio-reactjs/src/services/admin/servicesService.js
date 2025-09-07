import { axiosInstance } from '../../utils/api';

// Fetch services list with optional pagination and search
export const fetchServices = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await axiosInstance.get('/services', {
    params: { page, limit, search },
  });
  return response.data;
};

// Create a new service
export const createService = async (serviceData) => {
  const response = await axiosInstance.post('/services', serviceData);
  return response.data;
};

// Update an existing service by ID
export const updateService = async (id, serviceData) => {
  const response = await axiosInstance.put(`/services/${id}`, serviceData);
  return response.data;
};

// Delete a service by ID
export const deleteService = async (id) => {
  const response = await axiosInstance.delete(`/services/${id}`);
  return response.data;
};
