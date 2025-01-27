#!/usr/bin/env nod

//this file is used to create a http server.

import { Server } from "socket.io";
import { createServer } from "http";
import app from "../index";
import debug from "debug";
const serverDebug = debug('backend:server');

/**
 * Get port from .env and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server and attach Socket.IO.
 */

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*", // Adjust this for security
    methods: ["GET", "POST", "DELETE"],
    credentials: true, // Allow cookies to be sent with requests
  },
});

/**
 * Handle Socket.IO connections.
 */
io.on("connection", (socket) => {
  serverDebug(`New client connected: ${socket.id}`);

  // Example event handling
  socket.on("message", (data) => {
    serverDebug(`Message received: ${data}`);
    socket.broadcast.emit("message", data); // Broadcast to all clients
  });

  socket.on('joinLobby', (lobbyId) => {
    socket.join(lobbyId);
    console.log('User joined Lobby {lobbyId}');
  })

  socket.on("disconnect", (reason) => {
    serverDebug(`Client disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val; // named pipe

  if (port >= 0) return port; // port number

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException, port: string | number | false) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  serverDebug('Listening on ' + bind);
}