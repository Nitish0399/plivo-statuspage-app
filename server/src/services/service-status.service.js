const serviceStatusModel = require("../models/service-status.model");

/**
 * Create a new service status
 * @param {Object} data - The service status data to be created.
 * @returns {Promise} - A promise that resolves with the created service status.
 */
const createServiceStatus = (data) => {
  return new Promise((resolve, reject) => {
    serviceStatusModel.insert(data, (err, newStatus) => {
      if (err) {
        reject(new Error("Error creating service status."));
      }
      resolve(newStatus);
    });
  });
};

/**
 * Retrieve all service statuses
 * @returns {Promise} - A promise that resolves with an array of all service statuses.
 */
const getAllServiceStatuses = () => {
  return new Promise((resolve, reject) => {
    serviceStatusModel.find({}, (err, statuses) => {
      if (err) {
        reject(new Error("Error retrieving service statuses."));
      }
      resolve(statuses);
    });
  });
};

/**
 * Retrieve a specific service status by its ID
 * @param {string} id - The ID of the service status to be retrieved.
 * @returns {Promise} - A promise that resolves with the service status if found, or null.
 */
const getServiceStatusById = (id) => {
  return new Promise((resolve, reject) => {
    serviceStatusModel.findOne({ _id: id }, (err, status) => {
      if (err) {
        reject(new Error("Error retrieving service status."));
      }
      resolve(status);
    });
  });
};

/**
 * Update an existing service status by its ID
 * @param {string} id - The ID of the service status to be updated.
 * @param {Object} data - The new data to update the service status with.
 * @returns {Promise} - A promise that resolves when the update is complete.
 */
const updateServiceStatus = (id, data) => {
  return new Promise((resolve, reject) => {
    serviceStatusModel.update(
      { _id: id },
      { $set: data },
      {},
      (err, numUpdated) => {
        if (err || numUpdated === 0) {
          reject(
            new Error("Error updating service status or status not found.")
          );
        }
        resolve({ message: "Service status updated successfully." });
      }
    );
  });
};

/**
 * Delete a specific service status by its ID
 * @param {string} id - The ID of the service status to be deleted.
 * @returns {Promise} - A promise that resolves when the deletion is complete.
 */
const deleteServiceStatus = (id) => {
  return new Promise((resolve, reject) => {
    serviceStatusModel.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err || numRemoved === 0) {
        reject(new Error("Error deleting service status or status not found."));
      }
      resolve({ message: "Service status deleted successfully." });
    });
  });
};

module.exports = {
  createServiceStatus,
  getAllServiceStatuses,
  getServiceStatusById,
  updateServiceStatus,
  deleteServiceStatus,
};
