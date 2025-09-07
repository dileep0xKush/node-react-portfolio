// src/services/userService.js
import axios from 'axios';
import { API_BASE_URL } from '../../utils/apiConfig';

export const getUsers = async ({ page = 1, limit = 10, search = '' }) => {
    const params = new URLSearchParams({
        page,
        limit,
        search,
    });
    const response = await axios.get(`${API_BASE_URL}/users?${params.toString()}`);
    return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};