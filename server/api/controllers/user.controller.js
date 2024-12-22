// controllers/userController.js
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

const ACCESS_TOKEN_COOKIE_NAME = "access_token";
const ACCESS_TOKEN_COOKIE_ATTRIBUTES = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure flag in production
  sameSite: "Lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate the user
    const user = await userService.authenticateUser(email, password);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set the token in an HTTP-only cookie
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, token, ACCESS_TOKEN_COOKIE_ATTRIBUTES);

    // Respond with user details (excluding the token in the response body)
    res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    // Handle errors
    res.status(400).json({ message: error });
  }
};

async function logout(req, res, next) {
  try {
    // Clear the access token cookie
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME, ACCESS_TOKEN_COOKIE_ATTRIBUTES);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
};
