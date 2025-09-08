// src/utils/tokenBlacklist.js
const redisClient = require('../config/redisClient');

const addTokenToBlacklist = async (token, expiresInSeconds) => {
    const key = `blacklist:${token}`;
    await redisClient.set(key, 'true', { EX: expiresInSeconds }); // Auto-expire after token lifespan
};

const isTokenBlacklisted = async (token) => {
    const key = `blacklist:${token}`;
    const result = await redisClient.get(key);
    return result === 'true';
};

module.exports = {
    addTokenToBlacklist,
    isTokenBlacklisted
};
