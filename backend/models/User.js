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
    
    winCount: {
        type: String, 
        default: 0
    },
    bestTimes: {
        type: Map,
        of: Number,
        default: {},
    },
    createdAt: {
        type: Date, default: Data.now
    },
});


mofule.exports = model("Users", UserSchema, "Users");