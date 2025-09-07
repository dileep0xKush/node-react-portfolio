const serviceService = require("../services/serviceService");

const getServices = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const result = await serviceService.getAllServices({ page, limit, search });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getService = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createService = async (req, res) => {
  try {
    const newService = await serviceService.createService(req.body);
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const updatedService = await serviceService.updateService(req.params.id, req.body);
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const deletedService = await serviceService.deleteService(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
