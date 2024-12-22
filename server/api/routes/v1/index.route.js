const express = require("express");
const router = express.Router();

// Routes
const publicRoutes = require("./public.route");
const applicationRoute = require("./application.route");
const serviceRoute = require("./service.route");
const incidentRoute = require("./incident.route");

const authenticator = require("../../middlewares/authenticator.mw");

router.use("/public", publicRoutes);
router.use("/applications", authenticator, applicationRoute);
router.use("/services", authenticator, serviceRoute);
router.use("/incidents", authenticator, incidentRoute);

module.exports = router;
