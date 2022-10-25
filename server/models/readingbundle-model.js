const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReadingBundle = new Schema(
    {
        name: { type: String, required: true },
        userId: { type: String, required: true },
        groupId: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model("readingbundle", ReadingBundle)