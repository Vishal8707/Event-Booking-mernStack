const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../validation/validator");

const { isValidObjectId } = require("mongoose");


//=================================================== createUsers =====================================================

const createUsers = async function (req, res) {
  try {
    let data = req.body;

    data.userName = data.userName.toLowerCase().trim();
    data.emailId = data.emailId.toLowerCase().trim();

    let { title, userName, emailId, password } = data;

    data.title = title.trim()

    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill out all the details." });

    if (!title) return res.status(400).send({ status: false, msg: "title is mandatory" });
    if (!userName) return res.status(400).send({ status: false, msg: "Please provide a userName" });
    if (!emailId) return res.status(400).send({ status: false, msg: "Please provide an emailId" });
    if (!password) return res.status(400).send({ status: false, msg: "Please provide a password" });

    if (!validateName(userName)) return res.status(400).send({ status: false, message: "Please provide valid  userName" });

    if (!validateEmail(emailId)) return res.status(400).send({ status: false, message: "Please provide valid  emailId" });

    if (!validatePassword(password)) return res.status(400).send({ status: false, message: "Please provide valid  password" });

    let hashing = bcrypt.hashSync(password, 8);
    data.password = hashing;


    let titleEnum = userModel.schema.obj.title.enum;
    if (!titleEnum.includes(data.title)) return res.status(400).send({ status: false, msg: "title should be Mr, Mrs or Miss" });

    const checkEmailid = await userModel.findOne({ emailId: emailId });
    if (checkEmailid) return res.status(400).send({ status: false, msg: "This emailId is already registered" });

    const saveData = await userModel.create(data);
    return res.status(201).send({ status: true, mag: "user successfully register", data: saveData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

//=============================================== loginUser =================================================================

const loginUser = async function (req, res) {

  try {

    let data = req.body;
    let { emailId, password } = data;

    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill all the details" });

    if (!emailId || emailId == "") return res.status(400).send({ status: false, msg: "emailId is mandatory" });

    if (!password || password == "") return res.status(400).send({ status: false, msg: "password is mandatory" });

    if (!validateEmail(emailId)) return res.status(400).send({ status: false, message: "Please provide valid  emailId" });

    if (!validatePassword(password)) return res.status(400).send({ status: false, message: "Please provide valid  password" });

    let verifyUser = await userModel.findOne({ emailId: emailId });

    if (!verifyUser) return res.status(400).send({ status: false, message: "user not found" });


    let hash = verifyUser.password;
    let isCorrect = bcrypt.compareSync(password, hash);
    if (!isCorrect) return res.status(400).send({ status: false, message: "Password is incorrect" });

    let token = jwt.sign({ userId: verifyUser["_id"] }, "very-very-secret-key");

    res.setHeader("x-api-key", token);

    return res.status(200).send({ status: true, message: "User login successfull", data: { userId: verifyUser["_id"], token }, });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

let updateEmail = async function (req, res) {
  try {
    let userId = req.params.userId
    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })
    let getUserId = await userModel.findOne({ _id: userId })
    if (!getUserId) return res.status(404).send({ status: false, message: "User Id not found." });
    let data = req.body;
    let { userName, emailId, password } = data
    if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "Please fill all the details" });
    if (!userName) return res.status(400).send({ status: false, msg: "Please provide a userName" });
    if (!emailId || emailId == "") return res.status(400).send({ status: false, msg: "emailId is mandatory" });
    if (!password || password == "") return res.status(400).send({ status: false, msg: "password is mandatory" });



  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.msg })
  }
}

module.exports = { createUsers, loginUser, updateEmail };
