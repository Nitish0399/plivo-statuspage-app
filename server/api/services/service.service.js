const serviceModel = require("../models/service.model");
const { emitStatusChange } = require("../../socket");

/**
 * Create a new service for the application
 * @param {Object} data - The service data.
 * @returns {Promise} - A promise that resolves to the inserted service.
 */
const createService = (data) => {
  return new Promise((resolve, reject) => {
    if (!data.name.trim() || !data.description.trim()) {
      return reject(new Error("Name and description cannot be empty"));
    }
    serviceModel.insert(data, (err, newService) => {
      if (err) return reject(err);
      resolve(newService);
    });
  });
};

/**
 * Get services of an application
 * @param {Object} query - The query to filter services.
 * @returns {Promise} - A promise that resolves to the list of services.
 */
const getAppServices = (applicationId) => {
  return new Promise((resolve, reject) => {
    serviceModel.find({ applicationId }, (err, services) => {
      if (err) return reject(err);
      resolve(services);
    });
  });
};

/**
 * Get a specific service by ID
 * @param {String} serviceId - The ID of the service to retrieve.
 * @returns {Promise} - A promise that resolves to the service.
 */
const getServiceById = (serviceId) => {
  return new Promise((resolve, reject) => {
    serviceModel.findOne({ _id: serviceId }, (err, service) => {
      if (err) return reject(err);
      resolve(service);
    });
  });
};

/**
 * Update a service
 * @param {String} serviceId - The ID of the service to update.
 * @param {Object} data - The data to update.
 * @returns {Promise} - A promise that resolves to the updated service.
 */
const updateService = (serviceId, data) => {
  return new Promise((resolve, reject) => {
    serviceModel.update(
      { _id: serviceId },
      { $set: data },
      {},
      (err, numAffected) => {
        if (err) return reject(err);
        emitStatusChange(serviceId, data.status);
        resolve(numAffected);
      }
    );
  });
};

/**
 * Delete a service by ID
 * @param {String} serviceId - The ID of the service to delete.
 * @returns {Promise} - A promise that resolves to the number of deleted services.
 */
const deleteService = (serviceId) => {
  return new Promise((resolve, reject) => {
    serviceModel.remove({ _id: serviceId }, {}, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved);
    });
  });
};

module.exports = {
  createService,
  getAppServices,
  getServiceById,
  updateService,
  deleteService,
};
