const express = require('express');
const app = express();
const helmet = require("helmet");
const socketio = require('socket.io');
const connectToMongoDB = require('./config/mongodb');
const connectToRedisDB = require('./config/redisdb');
const expressServer = app.listen(3001);
const io = socketio(expressServer);

//connect to DBs
connectToMongoDB();
connectToRedisDB();

//helemet.js is used for security. It prevenets XSS and ClickJacking attacks
app.use(helmet());

app.get('/test', (req, res) => {
    res.send('Application Route Returned');
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
