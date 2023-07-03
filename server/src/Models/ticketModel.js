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
            require: true
        },
        venue: {
            type: String,
            require: true
        },
        bookingId: {
            type: String,
            default: uuidv4,
        },
        NoOfTickets: {
            type: Number,
            default: 1,
        },
        bookingDate: {
            type: Date,
            default: Date.now()
        },
        bookingStatus: {
            type: String,
            default: "Pending"
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true });

module.exports = mongoose.model("Ticketbooking", ticketSchema);
