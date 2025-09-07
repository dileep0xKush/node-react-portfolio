import { fetchServices as fetchServicesAPI, deleteService, createService, updateService } from '../../services/admin/servicesService';

// Fetch list of services with pagination and search
export const fetchServices = async ({ page = 1, limit = 10, search = '' } = {}) => {
  try {
    const data = await fetchServicesAPI({ page, limit, search });
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Create a new service
export const createServiceHandler = async (serviceData) => {
  try {
    const data = await createService(serviceData);
    return data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update an existing service
export const updateServiceHandler = async (id, serviceData) => {
  try {
    const data = await updateService(id, serviceData);
    return data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Delete a service by ID
export const deleteServiceHandler = async (id) => {
  try {
    const data = await deleteService(id);
    return data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};
