import { loginAdmin } from '../../services/admin/authService';

export const handleAdminLogin = async (formData) => {
    try {
        const data = await loginAdmin(formData);

        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed',
        };
    }
};