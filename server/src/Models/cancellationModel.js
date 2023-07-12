const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cancellationSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "Users",
            requireed: true,
            trim: true
        },
        title: {
            type: String,
            default: ""
        },
        userName: {
            type: String,
            default: ""

        },
        emailId: {
            type: String,
            default: ""

        },
        bookingId: {
            type: String,
            required: true,
            trim: true
        },
        eventName: {
            type: String,
            require: true
        },
        venue: {
            type: String,
            require: true
        },
        eventdate: {
            type: Date,
            default: ""
        },
        NoOfTickets: {
            type: Number,
            default: "",
        },
        cancellationStatus: {
            type: String,
            default: "pending"
        },
        cancellationDate: {
            type: Date,
            default: Date.now()
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true });

module.exports = mongoose.model("Ticket_Cancellation", cancellationSchema)
