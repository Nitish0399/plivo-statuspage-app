const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle rest of the errors
  res.status(500).json({
    error: "Internal Server Error",
  });
};

module.exports = errorHandler;
