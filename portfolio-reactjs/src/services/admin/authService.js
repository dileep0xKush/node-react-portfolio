import { axiosInstance } from '../../utils/api';

export const loginAdmin = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};


export const logoutAdmin  = async (credentials) => {
  const response = await axiosInstance.post('/auth/logout', credentials);
  return response.data;
};