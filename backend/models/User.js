const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        require: true
    },
    password: {
        type: String, 
        require: true
    },
    createdAt: {
        type: Date, default: Data.now
    },
    winCount: {
        type: String, 
        default: 0
    },
});


mofule.exports = model("Users", UserSchema, "Users");