const cancellationModel = require("../Models/cancellationModel")
const ticketModel = require("../Models/ticketModel");
const { isValidObjectId } = require("mongoose");

let cancelTicket = async function (req, res) {

    // try {
    let data = req.body;
    if (Object.keys(data).length === "") return res.status(400).send({ status: false, msg: "Please fill out all the details." })

    let { bookingId, userId } = data

    if (!bookingId || bookingId === "") return res.status(400).send({ status: false, msg: "Please enter your bookingId it is mandatory.." })
    if (!userId || userId == "") return res.status(400).send({ status: false, msg: "Please enter your userId it is mandatory.." })

    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

    let checkBookingId = await ticketModel.findOne({ bookingId: bookingId })

    if (!checkBookingId) return res.status(400).send({ status: false, msg: "Please enter a valid bookingId." })


    let saveData = await cancellationModel.create(data)
    
    saveData.cancellationStatus = "confirm"


    return res.status(200).send({ status: true, msg: "The ticket has been successfully cancelled.", data: saveData })
    // }
    // catch (err) {
    //     res.status(500).send({ status: false, msg: err.msg })
    // }
}

module.exports = { cancelTicket }