const mongoose = require('mongoose');

require('dotenv').config({path: '../process.env'});

async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("You successfully connected to MongoDB using Mongoose!");
        })
        .catch(error => {
            console.error("error connecting to MongoDB:", error);
        });
}

module.exports = connectToDatabase;