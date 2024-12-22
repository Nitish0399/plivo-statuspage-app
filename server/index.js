const express = require("express");
const { createServer } = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { initializeSocket } = require("./socket");

const appRouter = require("./api/routes/app.route");
const errorHandler = require("./api/middlewares/error-handler.mw");
const corsOptions = require("./api/config/cors.config");

/* -------------- Initializations ------------ */

const app = express();

const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

/* -------------- Mount Middlewares ------------ */

app.use(cookieParser());

app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Access to this page is forbidden");
});

app.use("/api", appRouter);

app.use(errorHandler);

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started listening on port ${process.env.SERVER_PORT}`);
});
