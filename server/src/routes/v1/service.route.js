const express = require("express");
const serviceController = require("../../controllers/service.controller");

const router = express.Router();

/**
 * Route to create a new service.
 */
router.post("/services", serviceController.createService);

/**
 * Route to get all services.
 */
router.get("/services", serviceController.getAllServices);

/**
 * Route to get a service by its ID.
 */
router.get("/services/:id", serviceController.getServiceById);

/**
 * Route to update a service by its ID.
 */
router.put("/services/:id", serviceController.updateService);

/**
 * Route to delete a service by its ID.
 */
router.delete("/services/:id", serviceController.deleteService);

module.exports = router;
