const express = require("express")

const SensorDataController = require("../controllers/sensordata-controller")
const UserController = require("../controllers/user-controller")

const router = express.Router();

// SENSOR DATA
router.post("/reading", SensorDataController.createReading)
router.get("/readings", SensorDataController.getAllReadings)
router.get("/reading/:uuid", SensorDataController.getReadingByUuid)
router.get("/reading/user/:userId", SensorDataController.getReadingByUserId)
router.delete("/reading/:uuid", SensorDataController.deleteReading)
router.post("/file", SensorDataController.downloadFile)
router.get("/file/:filename", SensorDataController.readFile)

// USER
router.post("/user", UserController.createUser)
router.get("/user/:email", UserController.getUserByEmail)
router.get("/users", UserController.getUsers)
router.delete("/user/:_id", UserController.deleteUser)
router.put("/user/:email", UserController.updateUser)
router.post("/user/login/:email", UserController.verifyUserLogin)

module.exports = router