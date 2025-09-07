const Service = require("../models/Service");

const getAllServices = async ({ page = 1, limit = 10, search = "" }) => {
  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 10);

  const query = {};
  if (search.trim()) {
    query.name = { $regex: search.trim(), $options: "i" };
  }

  const skip = (pageNumber - 1) * pageSize;
  const total = await Service.countDocuments(query);

  const services = await Service.find(query)
    .skip(skip)
    .limit(pageSize)
    .sort({ created_at: -1 });

  return {
    services,
    page: pageNumber,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalResults: total,
  };
};

const getServiceById = async (id) => {
  return await Service.findById(id);
};

const createService = async (serviceData) => {
  const service = new Service(serviceData);
  return await service.save();
};

const updateService = async (id, serviceData) => {
  return await Service.findByIdAndUpdate(id, serviceData, { new: true });
};

const deleteService = async (id) => {
  return await Service.findByIdAndDelete(id);
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
