const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const eventSchema = new mongoose.Schema({

    administratorId: {
        type: ObjectId,
        ref: "Administrators",
        required: true,
        trim: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    venue: {
        type: String,
        required: true,
        unique:true,
    },
    ticketAvability: {
        type: Number,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Events", eventSchema);
