// src/modules/admin/validation.js

export const validateField = (name, value, formData) => {
    switch (name) {
        case 'name':
            if (!value.trim()) return 'Name is required';
            if (value.length < 2) return 'Name must be at least 2 characters';
            return '';
        case 'email':
            if (!value.trim()) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Invalid email address';
            return '';
        case 'password':
            if (!value) return 'Password is required';
            if (value.length < 6) return 'Password must be at least 6 characters';
            return '';
        case 'confirmPassword':
            if (!value) return 'Please confirm your password';
            if (value !== formData.password) return 'Passwords do not match';
            return '';
        case 'role':
            if (!value) return 'Role is required';
            return '';
        default:
            return '';
    }
};

export const validateAll = (formData, validateFieldFn) => {
    return Object.keys(formData).reduce((acc, field) => {
        const error = validateFieldFn(field, formData[field], formData);
        if (error) acc[field] = error;
        return acc;
    }, {});
};
