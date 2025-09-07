// src/modules/admin/testimonials.js
import { fetchTestimonials, createTestimonial } from '../../services/admin/testimonialsService';

export const fetchTestimonialsHandler = async (filters = {}) => {
  try {
    const data = await fetchTestimonials(filters);
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export const createTestimonialHandler = async (testimonialData) => {
  try {
    const data = await createTestimonial(testimonialData);
    return data;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};
