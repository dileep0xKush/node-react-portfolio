const authService = require('../services/authService');
const { addTokenToBlacklist } = require('../utils/tokenBlacklist');
const jwt = require('jsonwebtoken'); 

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.decode(token);
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = decoded.exp - now;

        await addTokenToBlacklist(token, expiresIn);

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
module.exports = { loginUser, logoutUser };
