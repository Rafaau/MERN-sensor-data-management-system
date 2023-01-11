const supertest = require("supertest")
const app = require("../index")
const api = supertest(app)
const UserController = require("../controllers/user-controller")
const mongoose = require("mongoose")
const db = require("./db")
const { post } = require("../index")

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
    name: "Test",
    email: "Test@test.com",
    password: "Test"
}

const validReq = {
    body: {
        name: "Test",
        email: "Test@test.com",
        password: "Test"
    }
}

const mockRequest = { 
    params: { 
        email: "Test@test.com" 
    } 
}

const mockUpdateRequest = {
    body: {
        name: "Test",
        email: "Test@test.com",
        password: "Test"
    },

    params: { 
        email: "Test@test.com" 
    }  
}

const hackReq = {
    body: false
}

describe("USER CREATE", () => {

    test("CREATE call - Should return status code 400", async () => {
        await api
            .post("/api/user")
            .send({})
            .expect(400)
    })

    test("CREATE call - Should return status code 200 and content", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)
            .expect(201)
            .expect("Content-type", /application\/json/)
    })

    test("CREATE SERVICE - Should return status code 400", async () => {
        await UserController.createUser({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(400)
    })

    test("CREATE SERVICE - Should return error message", async () => {
        await UserController.createUser({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "You must provide a user data"})
    })

    test("CREATE SERVICE - Should return status code 201", async () => {
        await UserController.createUser(validReq, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(201)
    })

    test("CREATE SERVICE - Should return json", async () => {
        await UserController.createUser(validReq, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ 
            success: true, 
            id: expect.anything(), 
            message: "User created!" })
    })

})

describe("USER GET", () => {

    test("GET ALL call - Should return status code 404", async () => {
        await api
            .get("/api/users")
            .expect(404)
    })

    test("GET ALL call - Should return status code 200 and content", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET ALL SERVICE - Should return status code 404", async () => {
        await UserController.getUsers({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET ALL SERVICE - Should return error message", async () => {
        await UserController.getUsers({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "Users not found"})
    })

    test("GET ALL SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await UserController.getUsers({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET ALL SERVICE - Should return json", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await UserController.getUsers({}, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

    test("GET call - Should return status code 404", async () => {
        await api
            .get("/api/user/invalid")
            .expect(404)
    })

    test("GET call - Should return status code 200 and content", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await api
            .get("/api/user/Test@test.com")
            .expect(200)
            .expect("Content-type", /application\/json/)
    })

    test("GET SERVICE - Should return status code 404", async () => {
        await UserController.getUserByEmail(mockRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("GET SERVICE - Should return error message", async () => {
        await UserController.getUserByEmail(mockRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "User not found"})
    })

    test("GET SERVICE - Should return status code 200", async() => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await UserController.getUserByEmail(mockRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("GET SERVICE - Should return json", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await UserController.getUserByEmail(mockRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, data: expect.anything() })
    })

})

describe("USER UPDATE", () => {

    test("UPDATE SERVICE - Should return status code 400", async () => {
        await UserController.updateUser(hackReq, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(400)
    })

    test("UPDATE SERVICE - Should return error message", async () => {
        await UserController.updateUser(hackReq, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "You must provide a body to update"})
    })

    test("UPDATE SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await UserController.updateUser(mockUpdateRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(200)
    })

    test("UPDATE SERVICE - Should return json", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        await UserController.updateUser(mockUpdateRequest, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: true, message: "User updated!", email: mockUpdateRequest.body.email })
    })

})

describe("USER DELETE", () => {

    test("DELETE call - Should return status code 400", async () => {
        await api
            .delete("/api/user/invalid")
            .expect(400)
    })

    test("DELETE call - Should return status code 200", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        const get = await api.get("/api/user/Test@test.com")

        await api
            .delete(`/api/user/${get._body.data._id}`)
            .expect(200)
    })

    test("DELETE SERVICE - Should return status code 400", async () => {
        await UserController.deleteUser({ params: { id: "invalid" } }, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockStatus).toHaveBeenCalledWith(404)
    })

    test("DELETE SERVICE - Should return error message", async () => {
        await UserController.deleteUser({ params: { id: "invalid" } }, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        expect(mockJson).toHaveBeenCalledWith({ success: false, error: "User not found"})
    })

    test("DELETE SERVICE - Should return status code 200", async () => {
        await api
            .post("/api/user")
            .send(validApiReq)

        const get = await api.get("/api/user/Test@test.com")

        await UserController.deleteUser({ params: { _id: get._body.data._id } }, mockResponse)

        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        expect(mockStatus).toHaveBeenCalledWith(200)
    })
})