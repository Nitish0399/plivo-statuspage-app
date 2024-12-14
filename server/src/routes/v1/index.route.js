const express = require("express");
const router = express.Router();

// Routes
const applicationRoute = require("./application.route");
const serviceRoute = require("./service.route");
const serviceStatusRoute = require("./service-status.route");
const incidentRoute = require("./incident.route");

// Middlewares
// const authenticator = require("../../middlewares/authenticator.mw");

const cors = require("cors");

const corsOptions = require("../../config/cors.config");

/*
    CORS restriction
*/

router.use(cors(corsOptions));

router.use("/applications", applicationRoute);
router.use("/services", serviceRoute);
router.use("/service-status", serviceStatusRoute);
router.use("/incidents", incidentRoute);

// Just a temporary route to test functions, need to remove later
router.post("/test", async (req, res) => {
  // await Assistants.deleteFiles(ids);
  return res.send("").status(200);
});

module.exports = router;
