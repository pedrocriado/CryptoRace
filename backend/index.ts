import express from "express";
import session from "express-session";
import helmet from "helmet";
import connectToMongoDB from "./config/mongodb";
import rateLimiter from "./config/rateLimiter";
import initPassport from "./config/passport";
import authRouter from "./routes/auth";
import boardRouter from "./routes/leaderboard";
import lobbyRouter from "./routes/lobby";
import sessionMiddleware from "./config/session";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(sessionMiddleware);

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
app.use("/lobby", lobbyRouter);

export default app;
