import axios from 'axios'

const apiurl = 'http://localhost:5000/categories'

// POST – Ajouter une catégorie
export async function ajouterCategorie(data) {
    return await axios.post(`${apiurl}/ajouter`, data)
}

// DELETE – Supprimer une catégorie par ID
export async function supprimerCategorie(id) {
    return await axios.delete(`${apiurl}/supprimer/${id}`)
}

// GET – Lister toutes les catégories
export async function getCategories() {
    return await axios.get(`${apiurl}/liste`)
}

// GET – Détails d’une catégorie par ID
export async function getCategorieDetails(id) {
    return await axios.get(`${apiurl}/details/${id}`)
}

// PUT – Renommer une catégorie
export async function renommerCategorie(id, data) {
    return await axios.put(`${apiurl}/renommer/${id}`, data)
}
