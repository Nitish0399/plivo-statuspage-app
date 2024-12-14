const incidentModel = require("../models/incident.model");

/**
 * Create a new incident for a service
 * @param {Object} data - The incident data to be created.
 * @returns {Promise} - A promise that resolves with the created incident.
 */
const createIncident = (data) => {
  return new Promise((resolve, reject) => {
    incidentModel.insert(data, (err, newIncident) => {
      if (err) {
        reject(new Error("Error creating incident."));
      }
      resolve(newIncident);
    });
  });
};

/**
 * Retrieve all incidents for a specific service
 * @param {string} serviceId - The ID of the service for which to retrieve incidents.
 * @returns {Promise} - A promise that resolves with the list of incidents.
 */
const getIncidentsByServiceId = (serviceId) => {
  return new Promise((resolve, reject) => {
    incidentModel.find({ serviceId }, (err, incidents) => {
      if (err) {
        reject(new Error("Error retrieving incidents."));
      }
      resolve(incidents);
    });
  });
};

/**
 * Retrieve a specific incident by its ID
 * @param {string} id - The ID of the incident to retrieve.
 * @returns {Promise} - A promise that resolves with the incident, or null if not found.
 */
const getIncidentById = (id) => {
  return new Promise((resolve, reject) => {
    incidentModel.findOne({ _id: id }, (err, incident) => {
      if (err) {
        reject(new Error("Error retrieving incident."));
      }
      resolve(incident);
    });
  });
};

/**
 * Update an existing incident by its ID
 * @param {string} id - The ID of the incident to update.
 * @param {Object} data - The new data to update the incident with.
 * @returns {Promise} - A promise that resolves when the update is complete.
 */
const updateIncident = (id, data) => {
  return new Promise((resolve, reject) => {
    incidentModel.update({ _id: id }, { $set: data }, {}, (err, numUpdated) => {
      if (err || numUpdated === 0) {
        reject(new Error("Error updating incident or incident not found."));
      }
      resolve({ message: "Incident updated successfully." });
    });
  });
};

/**
 * Delete a specific incident by its ID
 * @param {string} id - The ID of the incident to delete.
 * @returns {Promise} - A promise that resolves when the deletion is complete.
 */
const deleteIncident = (id) => {
  return new Promise((resolve, reject) => {
    incidentModel.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err || numRemoved === 0) {
        reject(new Error("Error deleting incident or incident not found."));
      }
      resolve({ message: "Incident deleted successfully." });
    });
  });
};

module.exports = {
  createIncident,
  getIncidentsByServiceId,
  getIncidentById,
  updateIncident,
  deleteIncident,
};
