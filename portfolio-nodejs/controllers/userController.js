const userService = require("../services/userService");
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 10);

    const result = await userService.getUsersList({
      page: pageNumber,
      limit: pageSize,
      search,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((d) => d.message),
      });
    }
    const user = await userService.createUser(value);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
