import express from "express";
import session from "express-session";
import helmet from "helmet";
import socketio from "socket.io";
import connectToMongoDB from "./config/mongodb";
import rateLimiter from "./config/rateLimiter";
import initPassport from "./config/passport";
import authRouter from "./routes/auth";
import boardRouter from "./routes/leaderboard";

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

// Sets up the user authentication.
initPassport(app);

// Applies the rate limiter depending if signed in or not.
rateLimiter(app);

// Connect to databases.
connectToMongoDB();

// Helmet for security.
app.use(helmet());

// Sets the API request.
app.use("/", authRouter);
app.use("/leaderboard", boardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
