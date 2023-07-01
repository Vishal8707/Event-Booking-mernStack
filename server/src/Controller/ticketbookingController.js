const ticketModel = require("../Models/ticketModel")
const eventModel = require("../Models/eventModel.js");
const userModel = require("../Models/userModel");
const { isValidObjectId } = require("mongoose");


const bookingTicket = async function (req, res) {
    // try {

    const data = req.body;
    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill all the details" })
    const { userId, eventName, eventdate, venu, NoOfTickets, remainingTickets, bookingStatus } = data

    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })
    const checkUesrId = await userModel.findById(userId)
    if (!checkUesrId) return res.status(400).send({ status: false, msg: "Please Enter correct UersId" })


    const checkEvents = await eventModel.findOne({ $or: [{ eventName: eventName }, { eventdate: eventdate }, { venu: venu }] })
    console.log(checkEvents)
    if (!checkEvents) return res.status(400).send({ status: false, msg: "Event not found with this eventName, date and venu" })
    console.log(checkEvents)

    data.eventName = checkEvents.checkEvents
    data.eventdate = checkEvents.eventdate
    data.venu = checkEvents.venu

    const ticketBook = (await ticketModel.create(data))

    return res.status(201).send({ status: true, msg: "Successfully booking is completed", data: ticketBook })
    // }
    // catch (err) {
    //     res.status(500).send({ status: false, msg: err.msg })
    // }
}

module.exports = { bookingTicket }