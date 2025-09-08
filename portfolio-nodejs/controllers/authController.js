const authService = require('../services/authService');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);

        res.status(200).json({
            message: 'Login successful',
            user,
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { loginUser };
