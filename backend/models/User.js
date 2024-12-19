const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
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
})


mofule.exports = model("Users", UserSchema, "Users");