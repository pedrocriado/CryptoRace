const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RoomSchema = new Schema({
    roomName: {
        type: String, 
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users",
        require: true
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users"
    }],
    gameStarted: { 
        type:Boolean, 
        default:false, 
    },
    createdAt: {
        type: Date, default: Data.now
    },
    cryptograms: [{ 
        type: String
    }],
});


mofule.exports = model("Rooms", RoomSchema, "Rooms");