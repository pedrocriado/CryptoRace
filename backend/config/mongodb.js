const mongoose = require('mongoose');

require('dotenv').config();

const connectToMongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("You successfully connected to MongoDB using Mongoose!");
        })
        .catch(error => {
            console.error("error connecting to MongoDB:", error);
        });
}

module.exports = connectToMongoDB;