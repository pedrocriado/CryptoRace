const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GameSchema = new Schema({
    roomid: {
        type: Schema.Types.ObjectId, 
        ref: "Rooms", 
        require: true
    },
    cryptogram: { 
        type: String
    },
    playerProgress: [
        {
            playerId: {
                type: Schema.Types.ObjectId,
                ref: "Users",
                required: true,
            },
            solvedWords: {
                type: [String],
                default: [],
            },
            timeCompleted: {
                type: Number,
                default: null,
            }
        },
    ],
});


mofule.exports = model("Games", GameSchema, "Games");