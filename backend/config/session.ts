import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";

const MongoDBStore = connectMongoDBSession(session);

//stores the session in mongoDB to help with multiple intances
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

export default sessionMiddleware;