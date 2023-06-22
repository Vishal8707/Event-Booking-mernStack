const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cancellationSchema = new mongoose.Schema (
    {
        ticketId : {
            type : ObjectId ,
            ref : "Tickets" ,
            required : true ,
            trim : true
        } ,
        userId : {
            type : ObjectId ,
            ref : "Users" ,
            requireed : true ,
            trim : true
        } ,
        cancellationDate : {
            type : Date ,
            required : true
        } ,
        cancellationStatus : {
            type : String ,
            enum : [ "Pending" , "Cancelled" ]
        }
    }
)

module.exports = mongoose.model ( "Ticket_Cancellation" , cancellationSchema )
