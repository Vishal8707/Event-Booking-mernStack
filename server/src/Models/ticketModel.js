const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "Users",
        required: true,
        trim: true,
    },
    eventId: {
        type: ObjectId,
        ref: "Events",
        required: true,
        trim: true,
    },
    bookingId: {
        type: String,
        required: true,
        unique: true,
    },
    NoOfTickets: {
        type: Number,
        min: 1,
        max: 10,
        default: 1,
    },
    remainingTickets: {
        type: Number,
    },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
    },
}, { timestamps: true });

module.exports = mongoose.model("Tickets", ticketSchema);
