const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;
const { v4: uuidv4 } = require('uuid');

const ticketSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "Users",
            required: true,
            trim: true,
        },
        eventName: {
            type: String,
        },
        eventdate: {
            type: Date,
        },
        venue: {
            type: String,
        },
        bookingId: {
            type: String,
            required: true,
            default: uuidv4,
        },
        NoOfTickets: {
            type: Number,
            default: 1,
        },
        remainingTickets: {
            type: Number,
        },
        bookingDate: {
            type: Date,
            default: Date.now()
        },
        bookingStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            require: true
        },
    }, { timestamps: true });

module.exports = mongoose.model("Tickets", ticketSchema);
