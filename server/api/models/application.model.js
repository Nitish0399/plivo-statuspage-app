const Datastore = require("nedb");
const { applications } = require("../seeders/application.seeder");

// Initialize NeDB in memory for application management
const applicationDb = new Datastore({
  filename: "db/application.db",
  autoload: true,
  inMemoryOnly: true,
});

applicationDb.count({}, (err, count) => {
  if (count === 0) {
    applicationDb.insert(applications, (err) => {
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

module.exports = applicationDb;
