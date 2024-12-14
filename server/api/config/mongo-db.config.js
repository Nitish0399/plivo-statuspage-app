const mongoose = require("mongoose");
const { models, watchedModels } = require("../models/models");
const seeder = require("../seeders/seeder.js");
const AuditService = require("../services/audit.service");

const options = {
  readPreference: "secondary",
};

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_URI, options);

    await createCollections();

    seeder();

    addWatchers();

    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB");

    console.log(
      `Trying to reconnect in ${process.env.MONGO_RETRY_AFTER / 1000} seconds`
    );
    setTimeout(init, process.env.MONGO_RETRY_AFTER);
    throw error;
  }
}

async function createCollections() {
  await Promise.all(models.map((model) => model.createCollection()));
}

// sets change stream watch to the models
function addWatchers() {
  watchedModels.forEach((model) => {
    model
      .watch([], { fullDocument: "updateLookup" })
      .on("change", async (data) => {
        const collectionName = data.ns.coll;
        const operationType = data.operationType;
        const doc = data.fullDocument;

        if (operationType === "insert" || operationType === "update") {
          AuditService.record(collectionName, operationType, doc);
        }
      });
  });
}

module.exports = {
  init,
};
