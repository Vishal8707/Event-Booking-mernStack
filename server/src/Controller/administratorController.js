const administratorModel = require("../Models/administratorModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
    validateName,
    validateEmail,
    validatePassword,
} = require("../validation/validator");
const userModel = require("../Models/userModel");

const createAdministrator = async function (req, res) {
    try {

        let data = req.body;
        let { title, administratorName, emailId, password } = data

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill out all the details." })
        if (!title || title === "") return res.status(400).send({ status: false, msg: "title is mandatory." })
        if (!administratorName || administratorName === "") return res.status(400).send({ status: false, msg: "administratorName is mandatory." })
        if (!emailId || emailId === "") return res.status(400).send({ status: false, msg: "emailId is mandatory." })
        if (!password || password === "") return res.status(400).send({ status: false, msg: "password is mandatory." })

        const titleEnum = administratorModel.schema.obj.title.enum
        if (!titleEnum.includes(title)) return res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss." })

        if (!validateName(administratorName))
            return res
                .status(400)
                .send({ status: false, message: "Please provide valid  userName" });

        if (!validateEmail(emailId))
            return res
                .status(400)
                .send({ status: false, message: "Please provide valid  emailId" });

        if (!validatePassword(password))
            return res
                .status(400)
                .send({ status: false, message: "Please provide valid  password" });

        let checkEmailid = await administratorModel.findOne({ emailId: emailId })
        if (checkEmailid) return res.status(400).send({ status: true, msg: " This emailId is already register." })

        let checkUser = await userModel.findOne({ emailId: emailId })
        if (checkUser) return res.status(400).send({ status: true, msg: " This email ID is already registered as a user." })

        let hashing = bcrypt.hashSync(password, 8)
        data.password = hashing



        let saveData = await administratorModel.create(data)
        return res.status(201).send({ status: true, msg: "administrator successfully created ", data: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}

let administratorLogin = async function (req, res) {
    try {

        let data = req.body;
        let { emailId, password } = data

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill out your email Id and password." })
        if (!emailId || emailId === "") return res.status(400).send({ status: false, msg: "emailId is mandatory." })
        if (!password || password === "") return res.status(400).send({ status: false, msg: "password is mandatory." })

        if (!validateEmail(emailId)) return res.status(400).send({ status: false, message: "Please provide valid  emailId" });
        if (!validatePassword(password)) return res.status(400).send({ status: false, message: "Please provide valid  password" });

        let verifyAdministrator = await administratorModel.findOne({ emailId: emailId })

        let hash = verifyAdministrator.password
        let isCorrect = bcrypt.compareSync(password, hash)
        if (!isCorrect) return res.status(400).send({ status: false, msg: "Password is incorrect" })

        let token = jwt.sign({ userId: verifyAdministrator["_id"] }, "hello-adminstrator")
        res.setHeader("x-api-key", token);

        return res.status(200).send({ status: true, msg: "Administrator successfully login", token: token })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }

}

module.exports = { createAdministrator, administratorLogin }