const { Server } = require("socket.io");

let io;

let activeSockets = [];

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.APP_URL, // Your client URL
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    activeSockets.push(socket);

    // Handle custom events or emit updates
    socket.on("disconnect", () => {
      activeSockets = activeSockets.filter((ob) => ob.id === socket.id);
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const emitStatusChange = (serviceId, status) => {
  activeSockets.forEach((socket) => {
    socket.emit("statusUpdate", { serviceId, status });
  });
};

module.exports = { initializeSocket, getIoInstance, emitStatusChange };
