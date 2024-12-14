const Datastore = require("nedb");

// Initialize NeDB in memory for serivce status management
const serviceStatusDb = new Datastore({
  filename: "db/serviceStatus.db",
  autoload: true,
  inMemoryOnly: true,
});

module.exports = serviceStatusDb;
