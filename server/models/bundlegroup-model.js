const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BundleGroup = new Schema(
    {
        name: { type: String, required: true },
        userId: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model("bundlegroup", BundleGroup)