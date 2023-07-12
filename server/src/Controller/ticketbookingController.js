const ticketModel = require("../Models/ticketModel");
const eventModel = require("../Models/eventModel.js");
const userModel = require("../Models/userModel");
const { validateEmail, validatePassword, } = require("../validation/validator");
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");

const bookingTicket = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill all the details" });
        let { userId, eventName, venue, NoOfTickets } = data;

        if (!eventName || eventName === "") return res.status(400).send({ status: false, msg: "Please fill out the eventName is mandatory." });
        if (!venue || venue === "") return res.status(400).send({ status: false, msg: "Please fill out the venue is mandatory." });
        if (!userId || userId === "") return res.status(400).send({ status: false, msg: "Please enter your userId it is mandatory." });

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" });

        let checkUserId = await userModel.findById(userId);

        if (!checkUserId) return res.status(400).send({ status: false, msg: "Please Enter correct UserId" });

        let { title, userName, emailId } = checkUserId;

        data.title = title;
        data.userName = userName;
        data.emailId = emailId;

        let checkEvents = await eventModel.findOne({ eventName: eventName, venue: venue });

        if (!checkEvents) return res.status(400).send({ status: false, msg: "Event not found with this eventName and venue" });

        let { eventdate, remainingTickets } = checkEvents;

        data.eventdate = eventdate;
        data.bookingStatus = "Confirm";

        let existingTicket;
        let bookingTicket;

        if (userId) {
            existingTicket = await ticketModel.findOneAndUpdate({ userId: userId, isDeleted: false }, { $inc: { NoOfTickets: NoOfTickets } }, { new: true });
            if (!existingTicket) {
                bookingTicket = await ticketModel.create(data);
            }
        }
        let tickets = remainingTickets - NoOfTickets;

        if (tickets < 0) return res.status(400).send({ status: false, msg: `There is only ${remainingTickets} event ticket.` });

        await eventModel.updateMany({ remainingTickets: tickets });

        return res.status(201).send({ status: true, msg: "Successfully booking is completed", data: existingTicket || bookingTicket });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


let bookingHistory = async function (req, res) {
    // try {
    // let userId = req.params.userId;
    // if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "bookId is invalid" });

    let data = req.body;

    let { emailId } = data

    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "please fill all the details." })
    // if (!emailId || emailId === "") return res.status(400).send({ status: false, msg: "Please provide an emailId" });
    // if (!password || password === "") return res.status(400).send({ status: false, msg: "Please provide a password" });
    // if (!validateEmail(emailId)) return res.status(400).send({ status: false, message: "Please provide valid  emailId" });
    // if (!validatePassword(password)) return res.status(400).send({ status: false, message: "Please provide valid  password" });
    let getData = await ticketModel.find({ emailId: emailId });

   
    return res.status(201).send({ status: true, msg: "Successfully get the History of Booking ticket.", data: getData })
    // } catch (err) {
    //     res.status(500).send({ status: false, msg: err.message })
    // }

}
module.exports = { bookingTicket, bookingHistory }
