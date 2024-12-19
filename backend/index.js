const express = require('express');
const app = express();
const socketio = require('socket.io');
const connectToDatabase = require('./config/mongodb');

const expressServer = app.listen(3001);
const io = socketio(expressServer);

connectToDatabase();

app.get('/test', (req, res) => {
    res.send('Application Route Returned');
})
const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});