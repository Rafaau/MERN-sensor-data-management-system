const supertest = require("supertest")
const app = require("../index")
const api = supertest(app)
const BundleGroupController = require("../controllers/bundlegroup-controller")
const mongoose = require("mongoose")
const db = require("./db")

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
    name: "Test",
    userId: "1",
}

const validReq = {
    body: {
        name: "Test",
        userId: "1",
    }
}

const mockByUserIdRequest = { params: { userId: "1" }}

describe("BUNDLE GROUP CREATE", () => {

    test("POST call - should return status code 400", async () => {
        await api
            .post("/api/bundlegroup")
            .send({})
            .expect(400)
    })

    test("POST call - should return status code 201", async () => {
        await api
            .post("/api/bundlegroup")
            .send(validApiReq)
            .expect(201)
    })

    test("CREATE SERVICE - should return status code 400", async () => {
        await BundleGroupController.createBundleGroup({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(400)
    })

    test("CREATE SERVICE - should return error message", async () => {
        await BundleGroupController.createBundleGroup({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "You must provide bundle group data" })
    })

    test("CREATE SERVICE - should return status code 200", async () => {
        await BundleGroupController.createBundleGroup(validReq, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(201)
    })

    test("CREATE SERVICE - should return json", async () => {
        await BundleGroupController.createBundleGroup(validReq, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

})

describe("BUNDLE GROUP GET", () => {

    test("GET BY USERID call - should return status code 404", async () => {
        await api
            .get("/api/bundlegroups/user/invalid")
            .expect(404)
    })

    test("GET BY USERID call - should return status code 200 and content", async () => {
        await api
            .post("/api/bundlegroup")
            .send(validApiReq)
        
        await api
            .get("/api/bundlegroups/user/1")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY USERID SERVICE - should return status code 404", async () => {
        await BundleGroupController.getBundleGroupsByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })
    
    test("GET BY USERID SERVICE - should return error message", async () => {
        await BundleGroupController.getBundleGroupsByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Bundle groups not found" })
    })

    test("GET BY USERID SERVICE - should return status code 404", async () => {
        await api
            .post("/api/bundlegroup")
            .send(validApiReq)

        await BundleGroupController.getBundleGroupsByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY USERID SERVICE - should return status code 404", async () => {
        await api
            .post("/api/bundlegroup")
            .send(validApiReq)
            
        await BundleGroupController.getBundleGroupsByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })
})

describe("BUNDLE GROUP DELETE", () => {

    test("DELETE call - should return status code 200", async () => {
        const response = await api
            .post("/api/bundlegroup")
            .send(validApiReq)

        await api
            .delete(`/api/bundlegroup/${response._body.data._id}`)
            .expect(200)
    })

    test("DELETE SERVICE - should return status code 200", async () => {
        const response = await api
            .post("/api/bundlegroup")
            .send(validApiReq)

        const mock = { params: { _id: response._body.data._id }}

        await BundleGroupController.deleteBundleGroup(mock, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("DELETE SERVICE - should return json", async () => {
        const response = await api
            .post("/api/bundlegroup")
            .send(validApiReq)

        const mock = { params: { _id: response._body.data._id }}

        await BundleGroupController.deleteBundleGroup(mock, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })
})

