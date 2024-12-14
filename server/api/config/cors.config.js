var corsOptions = {
  origin: [
    "https://plivo-statuspage-client.vercel.app",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = corsOptions;
