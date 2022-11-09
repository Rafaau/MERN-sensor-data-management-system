const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SensorData = new Schema(
    {
        uuid: { type: String, required: true },
        userId: { type: String, required: true },
        name: { type: String, required: false },
        bundleId: { type: String, required: false },
        timestamp: { type: String, required: true },
        milliseconds: { type: Number, required: true},
        sensorlabels: { type: String, required: true},
        sensorvalues: { type: String, required: true},
        task: { type: String, required: false },
        isShared : { type: Boolean, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model("sensordata", SensorData)