import axios from 'axios'

const apiurl = 'http://localhost:5000/favoris'

// POST – Ajouter un produit aux favoris
export async function ajouterAuFavoris(data) {
    return await axios.post(`${apiurl}/ajouter`, data)
}

// POST – Retirer un produit des favoris
export async function retirerDuFavoris(data) {
    return await axios.post(`${apiurl}/retirer`, data)
}

// GET – Afficher tous les produits favoris d’un client
export async function afficherFavoris(clientId) {
    return await axios.get(`${apiurl}/${clientId}/afficher`)
}

// POST – Vérifier si un produit est dans les favoris
export async function verifierSiFavori(data) {
    return await axios.post(`${apiurl}/verifier`, data)
}

// POST – Vider les favoris
export async function viderFavoris(data) {
    return await axios.post(`${apiurl}/vider`, data)
}

// GET – Obtenir le nombre de produits dans les favoris
export async function nombreFavoris(clientId) {
    return await axios.get(`${apiurl}/${clientId}/nombre`)
}
