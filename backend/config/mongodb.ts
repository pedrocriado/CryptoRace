import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
  const url = process.env.MONGO_URL;

  if(!url){
    throw new Error("MONGO_URL is not defined in the environment variables.")
  }

  try {
    await connect(url)
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to Mongodb ${error}`);
    throw error;
  }
};

export default connectToMongoDB;