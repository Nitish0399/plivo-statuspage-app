const Datastore = require("nedb");

// Initialize NeDB in memory for application management
const applicationDb = new Datastore({
  filename: "db/application.db",
  autoload: true,
  inMemoryOnly: true,
});

module.exports = applicationDb;
