const express = require("express");
const serviceStatusController = require("../../controllers/service-status.controller");
const router = express.Router();

// Create a new service status
router.post("/service-status", serviceStatusController.createServiceStatus);

// Retrieve all service statuses
router.get("/service-status", serviceStatusController.getAllServiceStatuses);

// Retrieve a specific service status by ID
router.get("/service-status/:id", serviceStatusController.getServiceStatusById);

// Update a specific service status by ID
router.put("/service-status/:id", serviceStatusController.updateServiceStatus);

// Delete a specific service status by ID
router.delete(
  "/service-status/:id",
  serviceStatusController.deleteServiceStatus
);

module.exports = router;
