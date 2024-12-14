const serviceStatusService = require("../services/service-status.service");

const createServiceStatus = (req, res) => {
  const { applicationId, serviceName, status, description } = req.body;
  if (!applicationId || !serviceName || !status) {
    return res
      .status(400)
      .json({ error: "applicationId, serviceName, and status are required." });
  }

  const newStatus = { applicationId, serviceName, status, description };
  serviceStatusService.createServiceStatus(newStatus, (err, createdStatus) => {
    if (err) {
      return res.status(500).json({ error: "Error creating service status." });
    }
    res.status(201).json(createdStatus);
  });
};

const getAllServiceStatuses = (req, res) => {
  serviceStatusService.getAllServiceStatuses((err, statuses) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error retrieving service statuses." });
    }
    res.status(200).json(statuses);
  });
};

const getServiceStatusById = (req, res) => {
  const { id } = req.params;
  serviceStatusService.getServiceStatusById(id, (err, status) => {
    if (err || !status) {
      return res.status(404).json({ error: "Service status not found." });
    }
    res.status(200).json(status);
  });
};

const updateServiceStatus = (req, res) => {
  const { id } = req.params;
  const { serviceName, status, description } = req.body;

  const updates = { serviceName, status, description };
  serviceStatusService.updateServiceStatus(id, updates, (err, numUpdated) => {
    if (err || numUpdated === 0) {
      return res
        .status(404)
        .json({ error: "Error updating service status or status not found." });
    }
    res.status(200).json({ message: "Service status updated successfully." });
  });
};

const deleteServiceStatus = (req, res) => {
  const { id } = req.params;
  serviceStatusService.deleteServiceStatus(id, (err, numRemoved) => {
    if (err || numRemoved === 0) {
      return res
        .status(404)
        .json({ error: "Error deleting service status or status not found." });
    }
    res.status(200).json({ message: "Service status deleted successfully." });
  });
};

module.exports = {
  createServiceStatus,
  getAllServiceStatuses,
  getServiceStatusById,
  updateServiceStatus,
  deleteServiceStatus,
};
