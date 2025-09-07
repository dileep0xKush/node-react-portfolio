// src/services/admin/testimonialsService.js
import { axiosInstance } from '../../utils/api';

export const fetchTestimonials = async ({ page = 1, limit = 10, search = '' } = {}) => {
  const params = new URLSearchParams({ page, limit, search });
  const response = await axiosInstance.get(`/testimonials?${params.toString()}`);
  return response.data; // Assume { testimonials: [...], totalPages: number }
};

export const createTestimonial = async (testimonialData) => {
  const response = await axiosInstance.post('/testimonials', testimonialData);
  return response.data;
};
