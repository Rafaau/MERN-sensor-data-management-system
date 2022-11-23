const SensorData = require("../models/sensordata-model")
const User = require("../models/user-model")
const https = require("https")
const fs = require("fs")
const { parse } = require("csv-parse")
const { trusted } = require("mongoose")

createReading = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a sensor data.",
        })
    }

    const sensorData = new SensorData(body)

    if (!sensorData) {
        return res.status(400).json({ success: false, error: err })
    }

    await sensorData
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: sensorData._id,
                message: "Sensor data created!",
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Sensor data not created!",
            })
        })
}

getReadingByUuid = async (req, res) => {
    await SensorData.find({ uuid: req.params.uuid }, (err, readings) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!readings.length) {
            return res
                .status(404)
                .json({ success: false, error: "Reading not found" });
        }

        return res.status(200).json({ success: true, data: readings })
    }).catch(err => console.log(err))
}

getReadingByUserId = async (req, res) => {
    await SensorData.find({ userId: req.params.userId }, (err, readings) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!readings.length) {
            return res
                .status(404)
                .json({ success: false, error: "Reading not found" });
        }

        return res.status(200).json({ success: true, data: readings })
    }).catch(err => console.log(err))
}

getReadingByBundle = async (req, res) => {
    await SensorData.find({ bundleId: req.params.bundleId }, (err, readings) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!readings.length) {
            return res.status(404).json({ success: false, error: "Reading not found" })
        }

        return res.status(200).json({ success: true, data: readings })
    }).catch(err => console.log(err))
}

getAllReadings = async (req, res) => {
    await SensorData.find({}, (err, sensorDatas) => {
        if (err) {
            return res.status(400).json({ success: false, error: "Bad response" })
        }

        if (!sensorDatas.length) {
            return res
                .status(404)
                .json({ success: false, error: "Reading not found" });
        }

        return res.status(200).json({ success: true, data: sensorDatas })
    }).catch(err => console.log(err))
}

deleteReading = async (req, res) => {
    await SensorData.deleteMany({ uuid: req.params.uuid }, (err, sensordata) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!sensordata) {
            return res.status(404).json({ success: false, error: "Readings not found" })
        }

        return res.status(200).json({ success: true, data: sensordata })
    }).catch(err => console.log(err))
}

deleteReadingByBundleId = async (req, res) => {
    await SensorData.deleteMany({ bundleId: req.params.bundleId }, (err, sensordata) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!sensordata) {
            return res.status(404).json({ success: false, error: "Readings not found" })
        }

        return res.status(200).json({ success: true, message: "Readings deleted" })
    }).catch(err => console.log(err))
}

downloadFile = (req, res) => {
    const fixedUrl = req.body.link.replace("www", "dl").slice( 0, -5)
    const fileName = fixedUrl.slice(fixedUrl.lastIndexOf("/"))
    const file = fs.createWriteStream(`./files${fileName}`)
    const request = (link) =>{ 
            https.get(link, function(response) {
            if (response.statusCode == 302)
                request(response.headers.location)
            else {
                response.pipe(file)
                file.on("finish", () => {
                    file.close()      
                    return res.status(200).json({ success: true })             
                })
            }
        })
    }
    request(fixedUrl)
}

readFile = async (req, res) => {
    const fileName = req.params.filename
    console.log("ctrl: "+fileName)
    let sensorData = []
    await fs.readFile(`./files/${fileName}`, (err, data) => {
        parse(data, {columns: true, trim: true})
            .on("data", rows => {
                sensorData.push(rows)
            })
            .on("error", () => {
                console.log("err")
            })
            .on("end", () => {
                if (sensorData.length)
                    return res.status(200).json({ success: true, data: sensorData })
                else
                    return res.status(400).json({ success: false, error: err })
            })
    })      
}

streamDataToDb = async (req, res) => {
    await User.findOne({ _id: req.body.uuid }, (err, user) => {

        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err
                })
        }

        if (!user) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: "User with provided uuid does not exist"
                })
        }}).clone().then(() => {

        const body = req.body

        if (!body) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: "Cannot get post body"
                })
        }

        body.sensors.forEach(async sensor => {
            const uuid = body.uuid
            const userId = body.uuid
            const name = sensor.name
            const bundleId = "1"
            const timestamp = Date.now()
            const milliseconds = 1
            const sensorlabels = Object.keys(sensor)[1]+","+(Object.keys(sensor)[2] == undefined ? "" : Object.keys(sensor)[2])+","+(Object.keys(sensor)[3] == undefined ? "" : Object.keys(sensor)[3])
            const sensorvalues = sensor.value0+","+(sensor.value1 == undefined ? "" : sensor.value1)+","+(sensor.value2 == undefined ? "" : sensor.value2)
            const task = body.task
            const isShared = false

            const sensordata = { uuid, userId, name, bundleId, timestamp, milliseconds, sensorlabels, sensorvalues, task, isShared }
            console.log(sensordata)

            const sensorData = new SensorData(sensordata)

            if (!sensorData) {
                    console.log("err")
            }

            sensorData
                .save()
                .then(() => {
                    res.write(sensorData)
                })
                .catch(err => {
                    console.log("err")
                })
        })
    })
}

getReadingsByTask = async (req, res) => {
    await SensorData.find({ userId: req.params.userId, task: req.params.task }, (err, readings) => {
        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                })
        }

        if (!readings.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: "Readings not found"
                })
        }

        return res
            .status(200)
            .json({
                success: true,
                data: readings
            })
    }).catch(err => console.log(err))
}

getReadingsByTaskAndName = async (req, res) => {
    await SensorData.find({ userId: req.params.userId, task: req.params.task, name: req.params.name }, (err, readings) => {
        if (err) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                })
        }

        if (!readings.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: "Readings not found"
                })
        }

        return res
            .status(200)
            .json({
                success: true,
                data: readings
            })
    }).catch(err => console.log(err))
}

shareTaskByName = async (req, res) => {
    let share
    await SensorData.findOne({ userId: req.params.userId, task: req.params.name }, (err, reading) => {
        if (err) {
            return res
                .status(400)
        }
        if (!reading) {
            return res
                .status(404)
        }
        
        share = reading.isShared
    }).clone()

    await SensorData.updateMany({ task: req.params.name }, { isShared: !share })
    .then(() => {
        return res
            .status(200)
            .json({ success: true, message: "Share status updated" })
    })
}

getSharedTasks = async (req, res) => {
    await SensorData.find({ isShared: true }, (err, tasks) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!tasks.length) {
            return res
                .status(404)
                .json({ success: false, error: "No shared tasks" })
        }

        return res
            .status(200)
            .json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

deleteReadingsByTask = async (req, res) => {
    await SensorData.deleteMany({ task: req.params.task, userId: req.params.userId }, (err, readings) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!readings) {
            return res
                .status(404)
                .json({ success: false, error: "Readings not found" })
        }

        return res
            .status(200)
            .json({ success: true, message: "Readings deleted" })
    }).catch(err => console.log(err))
}

deletes = async (req, res) => {
    await SensorData.deleteMany({}, (err, reads) => {
        if (err) {
            return res.status(400)
        }
        return res
        .status(200)
        .json({ success: true, message: "deleted"})
    })
}

module.exports = {
    createReading,
    getAllReadings,
    getReadingByUuid,
    getReadingByUserId,
    getReadingByBundle,
    deleteReading,
    deleteReadingByBundleId,
    downloadFile,
    readFile,
    streamDataToDb,
    getReadingsByTask,
    getReadingsByTaskAndName,
    shareTaskByName,
    getSharedTasks,
    deleteReadingsByTask,
    deletes,
}