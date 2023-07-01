const ticketModel = require("../Models/ticketModel")
const eventModel = require("../Models/eventModel.js");
const userModel = require("../Models/userModel");
const { isValidObjectId } = require("mongoose");


const bookingTicket = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill all the details" })
        let { userId, eventName, venue, bookingStatus } = data

        if (!eventName || eventName === "") return res.status(400).send({ status: false, msg: "Please fill out the eventName is mandatory." })
        if (!venue || venue === "") return res.status(400).send({ status: false, msg: "Please fill out the venue is mandatory." })
        if (!userId || userId === "") return res.status(400).send({ status: false, msg: "Please enter your userId it is mandatory." })
        if (!bookingStatus || bookingStatus === "") return res.status(400).send({ status: false, msg: "Please enter the booking status; it is mandatory." })

        let bookingstatusEnum = ticketModel.schema.obj.bookingStatus.enum;
        if (!bookingstatusEnum.includes(data.bookingStatus)) return res.status(400).send({ status: false, msg: "title should be Pending, Confirmed or Cancelled" });
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })

        let checkUesrId = await userModel.findById(userId)
        if (!checkUesrId) return res.status(400).send({ status: false, msg: "Please Enter correct UersId" })

        let checkEvents = await eventModel.findOne({ $and: [{ eventName: eventName }, { venue: venue }] });
        let { ticketAvability } = checkEvents
        data.eventdate = checkEvents.eventdate
        if (!checkEvents) return res.status(400).send({ status: false, msg: "Event not found with this eventName, date and venu" })

        let ticketBook = await ticketModel.create(data)
        let tickets = ticketAvability - ticketBook.NoOfTickets
        if (tickets < 0) return res.status(400).send({ status: false, msg: `There is only ${ticketAvability} event ticket.` })
        let updateTicketAvability = await eventModel.updateOne({ ticketAvability: ticketAvability }, { $set: { ticketAvability: tickets } }, { new: true })
        return res.status(201).send({ status: true, msg: "Successfully booking is completed", data: ticketBook })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }
}

module.exports = { bookingTicket }