const express = require("express");
const applicationController = require("../../controllers/application.controller");
const router = express.Router();

// Create a new application
router.post("", applicationController.createApplication);

// Retrieve all applications
router.get("", applicationController.getApplications);

// Retrieve a specific application by ID
router.get("/:id", applicationController.getApplication);

// Update an application by ID
router.put("/:id", applicationController.updateApplication);

// Delete an application by ID
router.delete("/:id", applicationController.deleteApplication);

module.exports = router;
