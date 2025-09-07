import { axiosInstance } from '../../utils/api';

export const getUsers = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await axiosInstance.get('/users', {
    params: { page, limit, search },
  });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};
