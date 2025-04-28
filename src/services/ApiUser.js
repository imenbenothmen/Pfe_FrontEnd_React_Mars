import axios from 'axios'

const apiurl = 'http://localhost:5000/users'

//crud 

// GET requests

export async function getAllUsers() {
    return await axios.get(`${apiurl}/getAllUsers`);
}
  
export async function getUserById(id) {
    return await axios.get(`${apiurl}/getUserById/${id}`)
}

export async function searchUserByUsername(username) {
    return await axios.get(`${apiurl}/searchUserByUsername`, {
        params: { username }
    })
}


export async function getAllClient() {
    return await axios.get(`${apiurl}/getAllClient`)
}

export async function getAllAdmin() {
    return await axios.get(`${apiurl}/getAllAdmin`)
}

// POST requests
export async function addUserClient(userData) {
    return await axios.post(`${apiurl}/addUserClient`, userData)
}

export async function addUserLivreur(userData) {
    return await axios.post(`${apiurl}/addUserLivreur`, userData)
}

export async function addUserAdmin(userData) {
    return await axios.post(`${apiurl}/addUserAdmin`, userData)
}

export async function addUserClientWithImg(formData) {
    return await axios.post(`${apiurl}/addUserClientWithImg`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// PUT request
export async function updateUserById(id, userData) {
    return await axios.put(`${apiurl}/updateuserById/${id}`, userData)
}

// DELETE request
export async function deleteUserById(id) {
    return await axios.delete(`${apiurl}/deleteUserbyid/${id}`)
}

