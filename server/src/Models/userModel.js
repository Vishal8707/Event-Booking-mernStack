const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            enum: ["Mr", "Mrs", "Miss"],
            required: true,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            lowerCase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

    }, { timestamps: true });

module.exports = mongoose.model("Users", userSchema);


