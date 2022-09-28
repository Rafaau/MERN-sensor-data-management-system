const supertest = require("supertest")
const app = require("../index")
const api = supertest(app)
const SensorDataController = require("../controllers/sensordata-controller")
const mongoose = require("mongoose")
const db = require("./db")


let mockJson, mockStatus, mockResponse

beforeAll(async () => {mongoose.disconnect(), await db.connect()})
afterEach(async () => await db.clearDatabase())
beforeEach(() => {
    mockJson = jest.fn().mockImplementation(() => null)
    mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }))
    mockResponse = {
        status: mockStatus
    }
})
afterAll(async () => await db.closeDatabase())

const validApiReq = {
    uuid: "12345",
    userId: "12345",
    name: "Test",
    timestamp: "1",
    milliseconds: 101,
    sensorlabels: "x,y,z",
    sensorvalues: "1,2,3"
}

const validReq = {
    body: {
        uuid: "12345",
        userId: "12345",
        name: "Test",
        timestamp: "1",
        milliseconds: "101",
        sensorlabels: "x,y,z",
        sensorvalues: "1,2,3"
    }
}

const mockByUuidRequest = { params: { uuid: "12345" } }
const mockByUserIdRequest = { params: { userId: "12345" } }

describe("READING CREATE", () => {

    test("POST call - Should return status code 400", async () => {
        await api
            .post("/api/reading")
            .send({})
            .expect(400)
    })

    test("POST call - Should return status code 201", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)
            .expect(201)
    })

    test("CREATE SERVICE - Should return status code 400", async () => {
        const req = {}

        await SensorDataController.createReading(req, mockResponse)

        expect(mockStatus).toHaveBeenCalledWith(400)
    })

    test("CREATE SERVICE - Should return json", async () => {
        await SensorDataController.createReading({}, mockResponse)

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "You must provide a sensor data." })
    })

    test("CREATE SERVICE - Should return status code 201", async () => {
        await SensorDataController.createReading(validReq, mockResponse)

        expect(mockStatus).toHaveBeenCalledWith(201)
    })

    test("CREATE SERVICE - Should return json", async () => {
        await SensorDataController.createReading(validReq, mockResponse)

        expect(mockJson).toHaveBeenCalledWith({ success: true, message: "Sensor data created!", id: expect.anything() })
    })
})

describe("READING GET", () => {

    test("GET ALL call - Should return status code 404", async () => {
        await api
            .get("/api/readings")
            .expect(404)
    })

    test("GET ALL call - Should return status code 200 and content", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await api
            .get("/api/readings")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY UUID call - Should return status code 404", async () => {
        await api
            .get(`/api/reading/invalidUuid`)
            .expect(404)
    })

    test("GET BY UUID call - Should return status code 200 and content", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await api
            .get(`/api/reading/12345`)
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY USERID call - Should return status code 404", async () => {
        await api
            .get(`/api/reading/user/invalid`)
            .expect(404)
    })

    test("GET BY USERID call - Should return status code 200 and content", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await api
            .get(`/api/reading/user/12345`)
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET ALL SERVICE - Should return status code 400", async () => {
        await SensorDataController.getAllReadings({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET ALL SERVICE - Should return error message", async () => {
        await SensorDataController.getAllReadings({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Reading not found"})
    })

    test("GET ALL SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.getAllReadings({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET ALL SERVICE - Should return json", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.getAllReadings({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET BY UUID SERVICE - Should return status code 404", async () => {
        await SensorDataController.getReadingByUuid(mockByUuidRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET BY UUID SERVICE - Should return error message", async () => {
        await SensorDataController.getReadingByUuid(mockByUuidRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Reading not found" })
    })

    test("GET BY UUID SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.getReadingByUuid(mockByUuidRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY UUID SERVICE - Should return json", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.getReadingByUuid(mockByUuidRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET BY USERID SERVICE - Should return status code 404", async () => {
        await SensorDataController.getReadingByUserId(mockByUserIdRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET BY USERID SERVICE - Should return error message", async () => {
        await SensorDataController.getReadingByUserId(mockByUserIdRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Reading not found" })
    })

    test("GET BY USERID SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.getReadingByUserId(mockByUserIdRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY USERID SERVICE - Should return json", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.getReadingByUserId(mockByUserIdRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    }) 

})

describe("READING DELETE", () => {

    test("DELETE call - Should return status code 200", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await api
            .delete("/api/reading/12345")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })    

    test("DELETE SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)
        
        await SensorDataController.deleteReading(mockByUuidRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
        await api
            .get("/api/reading/12345")
            .expect(404)
    })

    test("DELETE SERVICE - Should return json", async () => {
        await api
            .post("/api/reading")
            .send(validApiReq)

        await SensorDataController.deleteReading(mockByUuidRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
        await api
            .get("/api/reading/12345")
            .expect(404)
    })
})
