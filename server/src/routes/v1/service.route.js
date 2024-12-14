const express = require("express");
const serviceController = require("../../controllers/service.controller");

const router = express.Router();

/**
 * Route to create a new service.
 */
router.post("", serviceController.createService);

/**
 * Route to get all services.
 */
router.get("/applications/:applicationId", serviceController.getAppServices);

/**
 * Route to get a service by its ID.
 */
router.get("/:id", serviceController.getServiceById);

/**
 * Route to update a service by its ID.
 */
router.put("/:id", serviceController.updateService);

/**
 * Route to delete a service by its ID.
 */
router.delete("/:id", serviceController.deleteService);

module.exports = router;
