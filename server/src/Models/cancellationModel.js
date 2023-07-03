const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cancellationSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: ObjectId,
            ref: "Users",
            requireed: true,
            trim: true
        },
        cancellationDate: {
            type: Date,
            default: Date.now()
        },
        cancellationStatus:{
            type:String,
            default:"pending"

        }
    }, { timestamps: true });

module.exports = mongoose.model("Ticket_Cancellation", cancellationSchema)
