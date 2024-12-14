const Datastore = require("nedb");
const { services } = require("../seeders/service.seeder");

// Initialize NeDB in memory for serivce management
const serviceDb = new Datastore({
  filename: "db/service.db",
  autoload: true,
  inMemoryOnly: true,
});

serviceDb.count({}, (err, count) => {
  if (count === 0) {
    serviceDb.insert(services, (err) => {
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

module.exports = serviceDb;
