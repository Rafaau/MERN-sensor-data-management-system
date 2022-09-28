import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api",
})

// SENSOR DATA
export const insertReading = data => api.post(`/reading`, data)
export const getAllReadings = () => api.get(`/readings`)
export const getReadingByUuid = uuid => api.get(`reading/${uuid}`)
export const getReadingByUserId = userId => api.get(`reading/user/${userId}`)
export const deleteReading = uuid => api.delete(`reading/${uuid}`)
export const downloadFile = url => api.post(`/file`, url)
export const readFile = filename => api.get(`/file/${filename}`)
export const openConnection = () => api.get(`/stream`)

// USER
export const createUser = user => api.post("/user", user)
export const getUserByEmail = email => api.get(`user/${email}`)
export const updateUser = (email, user) => api.put(`/user/${email}`, user)
export const verifyUserLogin = (email, password) => api.post(`/user/login/${email}`, {password: password})

const apis = {
    insertReading,
    getAllReadings,
    getReadingByUuid,
    getReadingByUserId,
    deleteReading,
    downloadFile,
    readFile,
    createUser,
    getUserByEmail,
    updateUser,
    verifyUserLogin,
    openConnection,
}

export default apis