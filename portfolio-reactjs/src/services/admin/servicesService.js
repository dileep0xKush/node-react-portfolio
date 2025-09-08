import { axiosInstance } from '../../utils/api';


export const fetchServices = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await axiosInstance.get('/services', {
    params: { page, limit, search },
  });
  return response.data;
};


export const createService = async (serviceData) => {
  const response = await axiosInstance.post('/services', serviceData);
  return response.data;
};

export const updateService = async (id, serviceData) => {
  const response = await axiosInstance.put(`/services/${id}`, serviceData);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await axiosInstance.delete(`/services/${id}`);
  return response.data;
};
