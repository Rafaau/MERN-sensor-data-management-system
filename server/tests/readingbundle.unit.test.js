const supertest = require("supertest")
const app = require("../index")
const api = supertest(app)
const ReadingBundleController = require("../controllers/readingbundle-controller")
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
    groupId: "1",
}

const validReq = {
    body: {
        name: "Test",
        userId: "1",
        groupId: "1",
    }
}

const mockByNameRequest = { params: { name: "Test" } }
const mockByUserIdRequest = { params: { userId: "1" } }
const mockByGroupIdRequest = { params: { groupId: "1" } }
const mockByIdRequest = { params: { _id: "634ac0db2d4359a46011732c" } }

describe("READING BUNDLE CREATE", () => {

    test("POST call - should return status code 400", async () => {
        await api
            .post("/api/bundle")
            .send({})
            .expect(400)
    })

    test("POST call - should return status code 201", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)
            .expect(201)
    })

    test("CREATE SERVICE - should return status code 400", async () => {
        await ReadingBundleController.createBundle({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(400)
    })

    test("CREATE SERVICE - should return error message", async () => {
        await ReadingBundleController.createBundle({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "You must provide a bundle data" })
    })

    test("CREATE SERVICE - should return status code 201", async () => {
        await ReadingBundleController.createBundle(validReq, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(201)
    })

    test("CREATE SERVICE - should return json", async () => {
        await ReadingBundleController.createBundle(validReq, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, id: expect.anything(), message: "Bundle created!" })
    })
})

describe("READING BUNDLE GET", () => {

    test("GET ALL call - should return status code 404", async () => {
        await api
            .get("/api/bundles")
            .expect(404)
    })

    test("GET ALL call - should return status code 200 and content", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await api
            .get("/api/bundles")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY NAME call - should return status code 404", async () => {
        await api
            .get("/api/bundle/invalid")
            .expect(404)
    })

    test("GET BY NAME call - should return status code 200 and content", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await api
            .get("/api/bundle/Test")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY USERID call - should return status code 404", async () => {
        await api
            .get("/api/bundles/invalid")
            .expect(404)
    })

    test("GET BY USERID call - should return status code 200 and content", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await api
            .get("/api/bundles/1")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY GROUPID call - should return status code 404", async () => {
        await api
            .get("/api/bundle/group/invalid")
            .expect(404)
    })

    test("GET BY GROUPID call - should return status code 200 and content", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await api
            .get("/api/bundles/group/1")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET BY ID call - should return status code 404", async () => {
        await api
            .get("/api/bundle/id/634ac0db2d4359a46011732c") // valid ObjectId
            .expect(404)
    })

    test("GET BY ID call - should return status code 200 and content", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)

        await api
            .get(`/api/bundle/id/${response._body.id}`)
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET ALL SERVICE - should return status code 404", async () => {
        await ReadingBundleController.getBundles({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET ALL SERVICE - should return error message", async () => {
        await ReadingBundleController.getBundles({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Bundles not found" })
    })

    test("GET ALL SERVICE - should return status code 200", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundles({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET ALL SERVICE - should return json", async () => {
        await api   
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundles({}, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET BY NAME SERVICE - should return status code 404", async () => {
        await ReadingBundleController.getBundleByName(mockByNameRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET BY NAME SERVICE - should return error message", async () => {
        await ReadingBundleController.getBundleByName(mockByNameRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Bundle not found" })
    })

    test("GET BY NAME SERVICE - should return status code 200", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundleByName(mockByNameRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY NAME SERVICE - should return json", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundleByName(mockByNameRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET BY USERID SERVICE - should return status code 404", async () => {
        await ReadingBundleController.getBundlesByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET BY USERID SERVICE - should return error message", async () => {
        await ReadingBundleController.getBundlesByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Bundles not found" })
    })

    test("GET BY USERID SERVICE - should return status code 200", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundlesByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY USERID SERVICE - should return json", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundlesByUserId(mockByUserIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET BY GROUPID SERVICE - should return status code 404", async () => {
        await ReadingBundleController.getBundlesByGroupId(mockByGroupIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET BY GROUPID SERVICE - should return error message", async () => {
        await ReadingBundleController.getBundlesByGroupId(mockByGroupIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Bundles not found" })
    })

    test("GET BY GROUPID SERVICE - should return status code 200", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundlesByGroupId(mockByGroupIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY GROUPID SERVICE - should return json", async () => {
        await api
            .post("/api/bundle")
            .send(validApiReq)

        await ReadingBundleController.getBundlesByGroupId(mockByGroupIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET BY ID SERVICE - should return status code 404", async () => {
        await ReadingBundleController.getBundleById(mockByIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET BY ID SERVICE - should return error message", async () => {
        await ReadingBundleController.getBundleById(mockByIdRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Bundle not found" })
    })

    test("GET BY ID SERVICE - should return status code 200", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)
        
        const mock = { params: { _id: response._body.id }}

        await ReadingBundleController.getBundleById(mock, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET BY ID SERVICE - should return json", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)
        
        const mock = { params: { _id: response._body.id }}

        await ReadingBundleController.getBundleById(mock, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

})

describe("READING BUNDLE DELETE", () => {

    test("DELETE call - should return status code 200", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)

        await api
            .delete(`/api/bundle/${response._body.id}`)
            .expect(200)
    })

    test("DELETE SERVICE - should return status code 200", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)

        const mock = { params: { _id: response._body.id }}

        await ReadingBundleController.deleteBundle(mock, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("DELETE SERVICE - should return json", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)

        const mock = { params: { _id: response._body.id }}

        await ReadingBundleController.deleteBundle(mock, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })
})

const hackReq = { body: false }
const mockUpdateRequest = {
    body: {
        name: "Test",
        userId: "1",
        groupId: "2",
    },

    params: {
        _id: ""
    }
}

describe("READING BUNDLE UPDATE", () => {

    test("UPDATE SERVICE - should return status code 400", async () => {
        await ReadingBundleController.updateBundle(hackReq, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(400)
    })

    test("UPDATE SERVICE - should return error message", async () => {
        await ReadingBundleController.updateBundle(hackReq, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "You must provide a bundle to update" })
    })

    test("UPDATE SERVICE - should return status code 200", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)

        mockUpdateRequest.params._id = response._body.id

        await ReadingBundleController.updateBundle(mockUpdateRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("UPDATE SERVICE - should return json", async () => {
        const response = await api
            .post("/api/bundle")
            .send(validApiReq)

        mockUpdateRequest.params._id = response._body.id

        await ReadingBundleController.updateBundle(mockUpdateRequest, mockResponse)

        await new Promise(resolve => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything(), message: "Bundle updated" })
    })
})