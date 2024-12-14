const express = require("express");
const router = express.Router();

// Routes
const applicationRoute = require("./application.route");
const serviceRoute = require("./service.route");
const incidentRoute = require("./incident.route");

router.use("/applications", applicationRoute);
router.use("/services", serviceRoute);
router.use("/incidents", incidentRoute);

module.exports = router;
