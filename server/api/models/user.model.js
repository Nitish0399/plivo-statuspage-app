const Datastore = require("nedb");
const { users } = require("../seeders/user.seeder");

// Initialize NeDB in memory for user management
const userDb = new Datastore({
  filename: "db/user.db",
  autoload: true,
  inMemoryOnly: true,
});

userDb.count({}, (err, count) => {
  if (count === 0) {
    userDb.insert(users, (err) => {
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

module.exports = userDb;
