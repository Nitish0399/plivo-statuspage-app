// const { Server } = require("socket.io");
// const socketEvent = require("../socket/event.socket");

// function init(httpServer) {
//   // Creating socket server
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

//   registerEvents(io);
// }

// function registerEvents(io) {
//   // This event is fired upon a new connection.
//   io.of("/chat").on("connection", (socket) => {
//     socketEvent(io, socket);
//   });
// }

// module.exports = { init };
