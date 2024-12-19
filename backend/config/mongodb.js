const mongoose = require('mongoose');
const uri = "mongodb+srv://dbAdmin6940:dbCryptographyPro1@django.dnf2v.mongodb.net/CryptoRace?retryWrites=true&w=majority$appName=django";

async function connectToDatabase() {
    // connect to MongoDB using Mongoose
    await mongoose.connect(uri)
        .then(() => {
            console.log("You successfully connected to MongoDB using Mongoose!");
        })
        .catch(error => {
            console.error("error connecting to MongoDB:", error);
        });
}

module.exports = connectToDatabase;