const express = require("express");
const incidentController = require("../../controllers/incident.controller");
const router = express.Router();

// Create a new incident
router.post("", incidentController.createIncident);

// Update an incident
router.put("/:incidentId", incidentController.updateIncident);

// Get an incident by ID
router.get("/:incidentId", incidentController.getIncident);

// List all incidents for an application
router.get("/applications/:applicationId", incidentController.listIncidents);

// Delete an incident by ID
router.delete("/:incidentId", incidentController.deleteIncident);

module.exports = router;
