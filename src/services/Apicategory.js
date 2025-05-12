import axios from 'axios'

const apiurl = 'http://localhost:5000/categories'

// POST – Add a category
export async function addCategory(data) {
    return await axios.post(`${apiurl}/addCategory`, data)
}

// DELETE – Delete a category by ID
export async function deleteCategory(id) {
    return await axios.delete(`${apiurl}/deleteCategory/${id}`)
}

// GET – List all categories
export async function getCategories() {
    return await axios.get(`${apiurl}/getCategories`)
}

// GET – Get category details by ID
export async function getCategoryDetails(id) {
    return await axios.get(`${apiurl}/getCategoryDetails/${id}`)
}

// PUT – Rename a category
export async function renameCategory(id, data) {
    return await axios.put(`${apiurl}/renameCategory/${id}`, data)
}
