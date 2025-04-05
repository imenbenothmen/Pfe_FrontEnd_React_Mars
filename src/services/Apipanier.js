import axios from 'axios'

const apiurl = 'http://localhost:5000/panier'

// POST – Créer un nouveau panier
export async function createPanier(panierData) {
    return await axios.post(`${apiurl}/create`, panierData)
}

// GET – Récupérer le panier d'un utilisateur par ID
export async function getPanierByClient(clientId) {
    return await axios.get(`${apiurl}/${clientId}`)
}

// POST – Ajouter un produit au panier
export async function addProduitToPanier(data) {
    return await axios.post(`${apiurl}/addProduit`, data)
}

// DELETE – Supprimer un produit du panier
export async function removeProduitFromPanier(clientId, produitId) {
    return await axios.delete(`${apiurl}/removeProduit/${clientId}/${produitId}`)
}

// PUT – Mettre à jour la quantité d’un produit dans le panier
export async function updateQuantiteProduit(data) {
    return await axios.put(`${apiurl}/updateQuantite`, data)
}

// DELETE – Supprimer le panier d’un client
export async function deletePanier(clientId) {
    return await axios.delete(`${apiurl}/deletePanier/${clientId}`)
}

// POST – Valider la commande et vider le panier
export async function validerCommande(data) {
    return await axios.post(`${apiurl}/validerCommande`, data)
}

// GET – Afficher le panier d’un client
export async function afficherPanier(clientId) {
    return await axios.get(`${apiurl}/afficherPanier/${clientId}`)
}

// POST – Créer ou Mettre à Jour un Panier (persisté)
export async function creerOuMettreAJourPanier(userId, panierData) {
    return await axios.post(`${apiurl}/api/panier/${userId}`, panierData)
}

// GET – Récupérer le Panier d’un utilisateur
export async function getPanierUtilisateur(userId) {
    return await axios.get(`${apiurl}/api/panier/${userId}`)
}

// POST – Ajouter un Produit au Panier avec vérification du stock
export async function ajouterProduitAuPanier(data) {
    return await axios.post(`${apiurl}/api/panier/ajouter`, data)
}

// POST – Vérifier le stock disponible pour le panier
export async function verifierStockPanier(data) {
    return await axios.post(`${apiurl}/api/panier/verifier-stock`, data)
}

// PUT – Mettre à jour le panier selon le stock
export async function mettreAJourStockPanier(userId, data) {
    return await axios.put(`${apiurl}/api/panier/${userId}/mettre-a-jour-stock`, data)
}
