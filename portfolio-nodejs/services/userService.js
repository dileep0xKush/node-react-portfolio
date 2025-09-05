const User = require("../models/User");

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
    .limit(pageSize);

  return {
    users,
    page: pageNumber,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalResults: total,
  };
};



exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
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
