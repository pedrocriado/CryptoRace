#!/usr/bin/env nod

//this file is used to create a http server.

import socketManager from "../socket/socketManager";
import { createServer } from "http";
import app from "../index";

/**
 * Get port from .env and store it in the Express app.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server and attach Socket.IO.
 */

const server = createServer(app);
socketManager.initialize(server);

export default socketManager;
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server.on('error', onError);
server.on('listening', onListening);


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
  console.log('Listening on ' + bind);
}