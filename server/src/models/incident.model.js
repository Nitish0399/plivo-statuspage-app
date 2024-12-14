const Datastore = require("nedb");
const { incidents } = require("../seeders/incident.seeder");

// Initialize NeDB in memory for incident management
const incidentDb = new Datastore({
  filename: "db/incident.db",
  autoload: true,
  inMemoryOnly: true,
});

incidentDb.count({}, (err, count) => {
  if (count === 0) {
    incidentDb.insert(incidents, (err) => {
      if (err) {
        console.error("Error inserting seed data:", err);
      } else {
        console.log("Seed data inserted successfully.");
      }
    });
  } else {
    console.log("Database already populated.");
  }
});

module.exports = incidentDb;
