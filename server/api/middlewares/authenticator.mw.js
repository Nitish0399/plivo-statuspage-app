const jwt = require("jsonwebtoken");

const authenticator = async (req, res, next) => {
  try {
    const token = req.cookies.access_token; // Get the token from the cookie

    if (!token) {
      throw new Error("Access Denied");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // TODO: to set user identity to be used by routes
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticator;
