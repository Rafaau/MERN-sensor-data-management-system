import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api",
})

// SENSOR DATA
export const insertReading = data => api.post(`/reading`, data)
export const getAllReadings = () => api.get(`/readings`)
export const getReadingByUuid = uuid => api.get(`reading/${uuid}`)
export const getReadingByUserId = userId => api.get(`reading/user/${userId}`)
export const getReadingByBundle = bundleId => api.get(`/reading/bundle/${bundleId}`)
export const deleteReading = uuid => api.delete(`reading/${uuid}`)
export const deleteReadingByBundleId = bundleId => api.delete(`reading/bundle/${bundleId}`)
export const downloadFile = url => api.post(`/file`, url)
export const readFile = filename => api.get(`/file/${filename}`)
export const getFile = filename => api.get(`/files/${filename}`)
export const openConnection = () => api.get(`/stream`)
export const getReadingsByTask = task => api.get(`/task/${task}`)
export const getReadingsByTaskAndName = (task, name) => api.get(`/task/${task}/${name}`)

// USER
export const createUser = user => api.post("/user", user)
export const getUserByEmail = email => api.get(`user/${email}`)
export const updateUser = (email, user) => api.put(`/user/${email}`, user)
export const verifyUserLogin = (email, password) => api.post(`/user/login/${email}`, {password: password})

// READING BUNDLE
export const getBundles = () => api.get(`/bundles`)
export const getBundleByName = name => api.get(`/bundle/${name}`)
export const getBundlesByUserId = userId => api.get(`/bundles/${userId}`)
export const getBundlesByGroupId = groupId => api.get(`/bundles/group/${groupId}`)
export const getBundleById = id => api.get(`/bundle/id/${id}`)
export const createBundle = bundle => api.post(`/bundle`, bundle)
export const updateBundle = (id, bundle) => api.put(`/bundle/${id}`, bundle)
export const deleteBundle = id => api.delete(`/bundle/${id}`)

// BUNDLE GROUP
export const getBundleGroupsByUserId = userId => api.get(`/bundlegroups/user/${userId}`)
export const createBundleGroup = bundleGroup => api.post(`/bundlegroup`, bundleGroup)
export const deleteBundleGroup = id => api.delete(`/bundlegroup/${id}`)

const apis = {
    insertReading,
    getAllReadings,
    getReadingByUuid,
    getReadingByUserId,
    getReadingByBundle,
    deleteReading,
    deleteReadingByBundleId,
    downloadFile,
    readFile,
    getFile,
    createUser,
    getUserByEmail,
    updateUser,
    verifyUserLogin,
    openConnection,
    getBundles,
    getBundleByName,
    getBundlesByUserId,
    getBundlesByGroupId,
    getBundleById,
    createBundle,
    updateBundle,
    deleteBundle,
    getBundleGroupsByUserId,
    createBundleGroup,
    deleteBundleGroup,
    getReadingsByTask,
    getReadingsByTaskAndName,
}

export default apis