const mongoose = require("mongoose")


const eventSchema = new mongoose.Schema({

    administratorId: {
        type: Object,
        ref: "Administrators",
        required: true,
        trim: true,
    },
    eventName: {
        type: String,
        required: true,
        trim: true,
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
        trim: true,
    },
    ticketAvability: {
        type: Number,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Events", eventSchema);
