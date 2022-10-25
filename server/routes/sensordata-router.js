const express = require("express")

const SensorDataController = require("../controllers/sensordata-controller")
const UserController = require("../controllers/user-controller")
const ReadingBundleController = require("../controllers/readingbundle-controller")
const BundleGroupController = require("../controllers/bundlegroup-controller")

const router = express.Router();

// SENSOR DATA
router.post("/reading", SensorDataController.createReading)
router.get("/readings", SensorDataController.getAllReadings)
router.get("/reading/:uuid", SensorDataController.getReadingByUuid)
router.get("/reading/user/:userId", SensorDataController.getReadingByUserId)
router.get("/reading/bundle/:bundleId", SensorDataController.getReadingByBundle)
router.delete("/reading/:uuid", SensorDataController.deleteReading)
router.delete("/reading/bundle/:bundleId", SensorDataController.deleteReadingByBundleId)
router.post("/file", SensorDataController.downloadFile)
router.get("/file/:filename", SensorDataController.readFile)

// STREAM
router.post("/stream", SensorDataController.streamDataToDb)
router.get("/task/:task", SensorDataController.getReadingsByTask)
router.get("/task/:task/:name", SensorDataController.getReadingsByTaskAndName)

// USER
router.post("/user", UserController.createUser)
router.get("/user/:email", UserController.getUserByEmail)
router.get("/users", UserController.getUsers)
router.delete("/user/:_id", UserController.deleteUser)
router.put("/user/:email", UserController.updateUser)
router.post("/user/login/:email", UserController.verifyUserLogin)

// READING BUNDLE
router.get("/bundles", ReadingBundleController.getBundles)
router.get("/bundle/:name", ReadingBundleController.getBundleByName)
router.get("/bundles/:userId", ReadingBundleController.getBundlesByUserId)
router.get("/bundles/group/:groupId", ReadingBundleController.getBundlesByGroupId)
router.get("/bundle/id/:_id", ReadingBundleController.getBundleById)
router.post("/bundle", ReadingBundleController.createBundle)
router.put("/bundle/:_id", ReadingBundleController.updateBundle)
router.delete("/bundle/:_id", ReadingBundleController.deleteBundle)

// BUNDLE GROUP
router.get("/bundlegroups/user/:userId", BundleGroupController.getBundleGroupsByUserId)
router.post("/bundlegroup", BundleGroupController.createBundleGroup)
router.delete("/bundlegroup/:_id", BundleGroupController.deleteBundleGroup)

module.exports = router