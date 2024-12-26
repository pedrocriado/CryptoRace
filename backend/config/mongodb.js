const mongoose = require('mongoose');

require('dotenv').config({path: '../process.env'});

async function connectToMongoDB() {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("You successfully connected to MongoDB!");
        })
        .catch(error => {
            console.error("error connecting to MongoDB:", error);
        });
}

module.exports = connectToMongoDB;