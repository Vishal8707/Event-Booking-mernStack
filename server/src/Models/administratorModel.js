const mongoose = require("mongoose")

const administratorSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            enum: ["Mr", "Mrs", "Miss"],
            required: true,
            trim: true,
        },
        administratorName: {
            type: String,
            required: true,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            lowerCase: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },

    }, { timestamps: true });

module.exports = mongoose.model("Administrator", administratorSchema);


