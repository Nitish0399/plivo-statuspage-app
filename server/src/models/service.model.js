const Datastore = require("nedb");

// Initialize NeDB in memory for serivce management
const serviceDb = new Datastore({
  filename: "db/service.db",
  autoload: true,
  inMemoryOnly: true,
});

module.exports = serviceDb;
