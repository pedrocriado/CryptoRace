import express from "express";
import session from "express-session";
import helmet from "helmet";
import connectToMongoDB from "./config/mongodb";
import rateLimiter from "./config/rateLimiter";
import initPassport from "./config/passport";
import authRouter from "./routes/auth";
import boardRouter from "./routes/leaderboard";
import lobbyRouter from "./routes/lobby";
import connectMongoDBSession from "connect-mongodb-session";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//stores the session in mongoDB to help with multiple intances
const MongoDBStore = connectMongoDBSession(session);

const mongoStore = new MongoDBStore({
  uri: process.env.MONGO_URL as string, 
  collection: "Sessions",
});

const sessionMiddleware = session({
  secret: process.env.AUTH_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
  store: mongoStore,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  },
});

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
