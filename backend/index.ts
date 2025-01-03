import express from "express";
import passport from "passport";
import session from "express-session";
import helmet from "helmet";
import socketio from "socket.io";
import connectToMongoDB from "./config/mongodb";
import connectToRedisDB from "./config/redisdb";
import initPassport from "./config/passport";
import authRouter from "./routes/auth";

const app = express();
const expressServer = app.listen(3001);
//const io = socketio(expressServer);
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(session({
  secret: process.env.AUTH_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  },
}));

//sets up the user authentication.
initPassport(app);

// Connect to databases
connectToMongoDB();
connectToRedisDB();

// Helmet for security
app.use(helmet());

app.use("/", authRouter);
app.get('/test', (req, res) => {
  res.send('Application Route Returned');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
