const cancellationModel = require("../Models/cancellationModel");
const ticketModel = require("../Models/ticketModel");
const eventModel = require("../Models/eventModel");
const { isValidObjectId } = require("mongoose");

let cancelTicket = async function (req, res) {
    // try {
    let data = req.body;
    if (Object.keys(data).length === "")return res.status(400).send({ status: false, msg: "Please fill out all the details." });

    let { bookingId, userId } = data;

    if (!bookingId || bookingId === "")return res.status(400).send({status: false,msg: "Please enter your bookingId it is mandatory."});
    if (!userId || userId == "")return res.status(400).send({status: false,msg: "Please enter your userId it is mandatory."});

    if (!isValidObjectId(userId))
        return res.status(400).send({ status: false, msg: "Invalid userId" });

    let checkBookingId = await ticketModel.findOne({
        bookingId: bookingId,
        userId: userId,
    });

    if (!checkBookingId)
        return res
            .status(400)
            .send({
                status: false,
                msg: "Please enter a valid bookingId and userId.",
            });

    let { title, userName, emailId, eventName, venue, eventdate, NoOfTickets } =
        checkBookingId;

    data.title = title;
    data.userName = userName;
    data.emailId = emailId;
    data.eventName = eventName;
    data.venue = venue;
    data.eventdate = eventdate;
    data.NoOfTickets = NoOfTickets;

    let checkEvents = await eventModel.findOne({ eventName: eventName, venue: venue });

    let { remainingTickets, ticketAvability } = checkEvents;
    if (remainingTickets === ticketAvability) return res.status(400).send({ status: false, msg: "Your all bookings have been successfully cancelled." });

    let tickets = remainingTickets + NoOfTickets;

    data.cancellationStatus = "confirm";
    data.isDeleted = true;

    let saveData = await cancellationModel.create(data);

    await eventModel.findOneAndUpdate({ eventName: eventName, venue: venue }, { remainingTickets: tickets }, { new: true });
    await ticketModel.findOneAndUpdate({ eventName: eventName, venue: venue }, { isDeleted: true }, { new: true });

    return res.status(200).send({ status: true, msg: "The ticket has been successfully cancelled.", data: saveData });

    // }
    // catch (err) {
    //     res.status(500).send({ status: false, msg: err.msg })
    // }
};
module.exports = { cancelTicket };
