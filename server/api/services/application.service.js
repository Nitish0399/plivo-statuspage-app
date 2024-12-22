const applicationDb = require("../models/application.model");

/**
 * Add a new application
 * @param {Object} applicationData - Data for the new application
 * @returns {Promise<Object>} - Created application
 */
async function addApplication(applicationData) {
  return new Promise((resolve, reject) => {
    applicationDb.insert(applicationData, (err, newDoc) => {
      if (err) {
        return reject(new Error(`Error adding application: ${err.message}`));
      }
      resolve(newDoc);
    });
  });
}

/**
 * List all applications
 * @returns {Promise<Array>} - List of applications
 */
async function listApplications() {
  return new Promise((resolve, reject) => {
    applicationDb.find({}, (err, docs) => {
      if (err) {
        return reject(new Error(`Error listing applications: ${err.message}`));
      }
      resolve(docs);
    });
  });
}

/**
 * Get application details by ID
 * @param {String} id - Application ID
 * @returns {Promise<Object>} - Application details
 */
async function getApplicationById(id) {
  return new Promise((resolve, reject) => {
    applicationDb.findOne({ _id: id }, (err, doc) => {
      if (err) {
        return reject(
          new Error(`Error retrieving application: ${err.message}`)
        );
      }
      if (!doc) {
        return reject(new Error("Application not found"));
      }
      resolve(doc);
    });
  });
}

/**
 * Update application details
 * @param {String} id - Application ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated application
 */
async function updateApplication(id, updateData) {
  return new Promise((resolve, reject) => {
    applicationDb.update(
      { _id: id },
      { $set: updateData },
      { returnUpdatedDocs: true },
      (err, numAffected, updatedDoc) => {
        if (err) {
          return reject(
            new Error(`Error updating application: ${err.message}`)
          );
        }
        if (!updatedDoc) {
          return reject(new Error("Application not found"));
        }
        resolve(updatedDoc);
      }
    );
  });
}

/**
 * Delete application by ID
 * @param {String} id - Application ID
 * @returns {Promise<Object>} - Deleted application
 */
async function deleteApplication(id) {
  return new Promise((resolve, reject) => {
    applicationDb.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        return reject(new Error(`Error deleting application: ${err.message}`));
      }
      if (numRemoved === 0) {
        return reject(new Error("Application not found"));
      }
      resolve({ message: "Application deleted successfully", id });
    });
  });
}

module.exports = {
  addApplication,
  listApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
