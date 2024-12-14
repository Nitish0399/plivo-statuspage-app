const Datastore = require("nedb");

// Initialize NeDB in memory for incident management
const incidentDb = new Datastore({
  filename: "db/incident.db",
  autoload: true,
  inMemoryOnly: true,
});

module.exports = incidentDb;
