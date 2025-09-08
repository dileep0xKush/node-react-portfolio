// src/utils/auth.js

export const requireAuth = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login';
        return false;
    }
    return true;
};

export const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
};
