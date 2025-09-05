import { getUsers } from '../../services/admin/userService';

export const fetchUsers = async ({ page = 1, limit = 10, search = '' } = {}) => {
  try {
    const data = await getUsers({ page, limit, search });
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};