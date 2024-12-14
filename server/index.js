const express = require("express");
const { createServer } = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const appRouter = require("./api/routes/app.route");
const errorHandler = require("./api/middlewares/error-handler.mw");
const corsOptions = require("./api/config/cors.config");

/* -------------- Initializations ------------ */

const app = express();

const httpServer = createServer(app);

/* -------------- Mount Middlewares ------------ */

// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Access to this page is forbidden");
});

app.use("/api", appRouter);

app.use(errorHandler);

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started listening on port ${process.env.SERVER_PORT}`);
});
