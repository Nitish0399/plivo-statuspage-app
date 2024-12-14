const express = require("express");
const { createServer } = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const appRouter = require("./src/routes/app.route");
const errorHandler = require("./src/middlewares/error-handler.mw");

/* -------------- Initializations ------------ */

const app = express();

const httpServer = createServer(app);

/* -------------- Mount Middlewares ------------ */

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
