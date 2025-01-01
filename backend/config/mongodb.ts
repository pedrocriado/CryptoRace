const mongoose = require('mongoose');

require('dotenv').config();

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Mongo connection successfully established.");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error?.message);
    process.exit(1);
  }
};

export default connect;