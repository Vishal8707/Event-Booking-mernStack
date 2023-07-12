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
    eventdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    venue: {
        type: String,
        required: true,
        unique: true,
    },
    ticketAvability: {
        type: Number,
        required: true,
    },
    remainingTickets: {
        type: Number,
        default:"",
      },
    ticketPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Events", eventSchema);
