const SensorData = require("../models/sensordata-model")
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
    await SensorData.find({ uuid: req.params.uuid}, (err, readings) => {
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
    await SensorData.find({ userId: req.params.userId}, (err, readings) => {
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
            return res.status(404).json({ success: false, error: "Readings not found"})
        }

        return res.status(200).json({ success: true, data: sensordata })
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

module.exports = {
    createReading,
    getAllReadings,
    getReadingByUuid,
    getReadingByUserId,
    deleteReading,
    downloadFile,
    readFile,
}