const eventModel = require("../Models/eventModel")
const administratorModel = require("../Models/administratorModel")
const { validateName, validatePrice } = require("../validation/validator");
const { isValidObjectId } = require("mongoose");



let createEvents = async function (req, res) {

    try {
        let data = req.body;
        let { administratorId, eventName, eventdate, time, venue, ticketAvability, ticketPrice } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill out all the details" })
        
        const [day, month, year] = eventdate.split('/').map(Number);
        const dateObject = new Date(year, month - 1, day);
        console.log(dateObject)
        data.eventdate = dateObject
        

        if (!administratorId || administratorId === "") return res.status(400).send({ status: false, msg: "Please fill out the administrator's ID is mandatory." })
        if(!isValidObjectId(administratorId)) return res.status(400).send({status:false, msg:"Please Enter valid administratorId."})
        if (!eventName || eventName === "") return res.status(400).send({ status: false, msg: "Please fill out the eventName is mandatory." })
        if (!eventdate || eventdate === "") return res.status(400).send({ status: false, msg: "Please fill out the eventdate is mandatory." })
        if (!time || time === "") return res.status(400).send({ status: false, msg: "Please fill out the time is mandatory." })
        if (!venue || venue === "") return res.status(400).send({ status: false, msg: "Please fill out the venue is mandatory." })
        if (!ticketAvability || ticketAvability === "") return res.status(400).send({ status: false, msg: "Please fill out the ticketAvability is mandatory." })
        if (!ticketPrice || ticketPrice === "") return res.status(400).send({ status: false, msg: "Please fill out the ticketPrice is mandatory." })

        let checkAdministrator = await administratorModel.findById(administratorId)
        if (!checkAdministrator) return res.status(400).send({ status: true, msg: "Administrator does not fund with this administrator ID." })
        let checkVenue = await eventModel.findOne({ venue: venue })
        if (checkVenue) return res.status(400).send({ status: true, msg: "This venue is already registered for different events." })
        if (!validateName(eventName)) return res.status(400).send({ status: false, msg: "Please fill in the valid event name." })
        if (!validatePrice(ticketPrice)) return res.status(400).send({ status: false, msg: "Please fill in the valid ticketPrice." })
        if (!validateName(venue)) return res.status(400).send({ status: false, msg: "Please fill in the valid venue." })

        let saveEvents = await eventModel.create(data)
        return res.status(400).send({ status: true, msg: "Event successfully Created", data: saveEvents })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}

module.exports = { createEvents }