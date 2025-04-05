import axios from 'axios'

const apiurl = 'http://localhost:5000/avis'

// POST – Laisser un avis pour un produit
export async function laisserAvis(data) {
    return await axios.post(`${apiurl}`, data)
}

// PUT – Modifier un avis pour un produit
export async function modifierAvis(data) {
    return await axios.put(`${apiurl}`, data)
}

// DELETE – Supprimer un avis pour un produit
export async function supprimerAvis(data) {
    return await axios.delete(`${apiurl}`, { data })
}

// GET – Récupérer l'avis d'un utilisateur pour un produit
export async function getAvisUtilisateur() {
    return await axios.get(`${apiurl}/utilisateur`)
}

// GET – Afficher tous les avis d'un produit
export async function afficherAvis(produitId) {
    return await axios.get(`${apiurl}/${produitId}`)
}

// GET – Calculer la note moyenne d'un produit
export async function calculerNoteMoyenne(produitId) {
    return await axios.get(`${apiurl}/moyenne/${produitId}`)
}
