const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GameSchema = new Schema({
    roomid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Rooms", 
        require: true
    },
    cryptogram: { 
        type: String
    },
});

mofule.exports = model("Games", GameSchema, "Games");