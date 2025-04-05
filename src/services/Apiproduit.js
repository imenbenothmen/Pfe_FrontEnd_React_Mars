import axios from 'axios'

const apiurl = 'http://localhost:5000/produits'

// POST – Ajouter un produit
export async function ajouterProduit(produitData) {
    return await axios.post(`${apiurl}/ajouter`, produitData)
}

// DELETE – Supprimer un produit par ID
export async function supprimerProduit(id) {
    return await axios.delete(`${apiurl}/supprimer/${id}`)
}

// GET – Afficher tous les produits
export async function afficherProduits() {
    return await axios.get(`${apiurl}/afficher`)
}

// GET – Afficher les détails d'un produit par ID
export async function afficherDetailsProduit(id) {
    return await axios.get(`${apiurl}/details/${id}`)
}

// GET – Obtenir le nombre de produits dans une catégorie
export async function getNombreProduits(categorieId) {
    return await axios.get(`${apiurl}/nombre/${categorieId}`)
}

// GET – Obtenir le nom d’un produit par ID
export async function getNomProduit(id) {
    return await axios.get(`${apiurl}/nom/${id}`)
}

// PUT – Mettre à jour un produit par ID
export async function mettreAJourProduit(id, produitData) {
    return await axios.put(`${apiurl}/mettre-a-jour/${id}`, produitData)
}
