const User = require("../models/User");
const bcrypt = require('bcryptjs');

exports.getAllUsers = async () => {
  return await User.find().select("name email role");
};

exports.getUsersList = async ({ page = 1, limit = 10, search = "" }) => {
  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 10);

  const query = {};

  if (search.trim()) {
    query.$or = [
      { name: { $regex: search.trim(), $options: "i" } },
      { email: { $regex: search.trim(), $options: "i" } },
    ];
  }

  const skip = (pageNumber - 1) * pageSize;
  const total = await User.countDocuments(query);

  const users = await User.find(query)
    .select("name email role")
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });

  return {
    users,
    page: pageNumber,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalResults: total,
  };
};



exports.createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = new User({
    ...data,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  const userObj = savedUser.toObject();
  delete userObj.password;
  return userObj;
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
