const express = require("express");
const applicationController = require("../../controllers/application.controller");
const serviceController = require("../../controllers/service.controller");
const incidentController = require("../../controllers/incident.controller");
const userController = require("../../controllers/user.controller");

const router = express.Router();

// POST route to login the user
router.post("/login", userController.login);

router.post("/logout", userController.logout);

// Retrieve all applications
router.get("/applications", applicationController.getApplications);

// Route to get all services.
router.get(
  "/services/applications/:applicationId",
  serviceController.getAppServices
);

// List all incidents for an application
router.get(
  "/incidents/applications/:applicationId",
  incidentController.listIncidents
);

module.exports = router;
