const express = require("express")

const { createUsers, loginUser } = require("../Controller/userController")
const { createAdministrator, administratorLogin } = require("../Controller/administratorController")
const { createEvents } = require("../Controller/eventController")
const { bookingTicket } = require("../Controller/ticketbookingController")
const { cancelTicket } = require("../Controller/ticketcancellationController")

const router = express.Router()

router.get('/test-me', function (req, res) {
    res.send({ test: "Test-API" })
})

router.post('/register', createUsers)
router.post('/login', loginUser)


router.post('/registerAdministrator', createAdministrator)
router.post('/administratorLogin', administratorLogin)

router.post('/events', createEvents)

router.post('/booking', bookingTicket)

router.post('/cancel', cancelTicket)





router.all("/*", function (req, res) { res.status(404).send({ status: false, msg: "Invalid HTTP request" }) })

module.exports = router