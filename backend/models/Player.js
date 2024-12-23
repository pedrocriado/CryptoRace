const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PlayerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    gameId: {
        type: Schema.Types.ObjectId,
        ref: "Games",
        required: true,
    },
    solvedWords: {
        type: Map,
        of: String,
        default: {},
    },
    timeCompleted: {
        type: Number,
        default: null,
    },
});

mofule.exports = model("Players", PlayerSchema, "Players");