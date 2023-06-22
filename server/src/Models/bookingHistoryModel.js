const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const bookingHistorySchema = new mongoose.Schema (
    {
        userId : {
            type : ObjectId ,
            ref : "Users",
            required : true ,
            trim : true
        } ,
        eventId : {
            type : ObjectId ,
            ref : "Events" ,
            required : true ,
            trim : true
        } , 
        ticketId : {
            type : ObjectId ,
            ref : "Tickets" ,
            required : true ,
            trim : true
        }
    }
)

module.exports = mongoose.model( "Booking_History" , bookingHistorySchema )
