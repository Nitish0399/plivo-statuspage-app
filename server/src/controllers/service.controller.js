const serviceService = require("../services/service.service");

/**
 * Create a new service
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const createService = async (req, res) => {
  try {
    const data = req.body;
    const newService = await serviceService.createService(data);
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all services
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices({});
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a specific service by ID
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a service
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const data = req.body;
    const updatedService = await serviceService.updateService(serviceId, data);
    res
      .status(200)
      .json({ message: "Service updated successfully", updatedService });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a service by ID
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const numRemoved = await serviceService.deleteService(serviceId);
    if (numRemoved === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
