import axios from 'axios'

const apiurl = 'http://localhost:5000/users'

//crud 

// GET requests



export async function getAllUsers() {
    return await axios.get(`${apiurl}/getAllUsers`,{ withCredentials: true });
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
    return await axios.get(`${apiurl}/getAllClient`,{ withCredentials: true });
}

export async function getAllAdmin() {
    return await axios.get(`${apiurl}/getAllAdmin`,{ withCredentials: true });
}

// POST requests
export async function addUserClient(userData) {
    return await axios.post(`${apiurl}/addUserClient`, userData)
}

export async function addUserLivreur(userData) {
    return await axios.post(`${apiurl}/addUserLivreur`, userData)
}

export async function addUserAdmin(userData) {
    return await axios.post(`${apiurl}/addUserAdmin`, userData, {
        withCredentials: true
    });
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

// Obtenir son propre profil
export async function getMyProfile() {
    return await axios.get(`${apiurl}/profile`, { withCredentials: true });
}

// Mettre à jour son propre profil
export async function updateMyProfile(userData) {
    return await axios.put(`${apiurl}/profile/update`, userData, { withCredentials: true });
}

// Option 2 
export async function login(credentials) {
  return await axios.post(`${apiurl}/login`, credentials, { withCredentials: true });
}
 
// POST request pour logout
export async function logout() {
  return await axios.post(`${apiurl}/logout`, {}, { withCredentials: true });
}
