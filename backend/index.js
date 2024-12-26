const express = require('express');
const app = express();
const helmet = resquire("helmet");
const socketio = require('socket.io');
const connectToDatabase = require('./config/mongodb');

const expressServer = app.listen(3001);
const io = socketio(expressServer);

//connect to mongodb through mongoose
connectToDatabase();

//helemet.js is used for security. It prevenets XSS and ClickJacking attacks
app.use(helmet());

app.get('/test', (req, res) => {
    res.send('Application Route Returned');
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});