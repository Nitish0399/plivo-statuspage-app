const bcrypt = require("bcryptjs");

const userDb = require("../models/user.model");

async function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    userDb.findOne({ email }, (err, user) => {
      if (err) return reject("Error retrieving user");
      if (!user) return reject("User not found");

      // Compare provided password with the stored hash
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return reject("Error comparing passwords");
        if (!isMatch) return reject("Invalid credentials");

        // Return the user if authentication is successful
        resolve(user);
      });
    });
  });
}

module.exports = { authenticateUser };
