import axios from 'axios'

const apiurl = 'http://localhost:5000/livraisons'

// POST – Créer une livraison
export async function createLivraison(livraisonData) {
    return await axios.post(`${apiurl}`, livraisonData)
}

// GET – Obtenir toutes les livraisons d’un client
export async function getLivraisonsByClient(clientId) {
    return await axios.get(`${apiurl}/client/${clientId}`)
}

// GET – Obtenir une livraison par ID
export async function getLivraisonById(livraisonId) {
    return await axios.get(`${apiurl}/${livraisonId}`)
}

// PUT – Mettre à jour le statut d’une livraison
export async function mettreAJourStatut(livraisonId, data) {
    return await axios.put(`${apiurl}/${livraisonId}`, data)
}

// DELETE – Supprimer une livraison
export async function deleteLivraison(livraisonId) {
    return await axios.delete(`${apiurl}/${livraisonId}`)
}

// GET – Calculer les frais de livraison (via params)
export async function getFraisLivraison(destination, poids) {
    return await axios.get(`${apiurl}/frais/${destination}/${poids}`)
}

// POST – Calculer les frais de livraison (via body)
export async function postCalculerFraisLivraison(data) {
    return await axios.post(`http://localhost:5000/calculer-frais-livraison`, data)
}

// GET – Obtenir l’adresse de livraison
export async function getAdresseLivraison(livraisonId) {
    return await axios.get(`${apiurl}/adresse/${livraisonId}`)
}

// GET – Obtenir la date de livraison
export async function getDateLivraison(livraisonId) {
    return await axios.get(`${apiurl}/date/${livraisonId}`)
}

// GET – Suivre une livraison avec numéro de suivi
export async function suivreLivraison(numeroSuivi) {
    return await axios.get(`${apiurl}/suivi/${numeroSuivi}`)
}

// PUT – Annuler une livraison
export async function annulerLivraison(livraisonId) {
    return await axios.put(`${apiurl}/annuler/${livraisonId}`)
}

// PUT – Confirmer une livraison
export async function confirmerLivraison(livraisonId) {
    return await axios.put(`${apiurl}/confirmer/${livraisonId}`)
}

// GET – Lister les transporteurs
export async function listerTransporteurs() {
    return await axios.get(`http://localhost:5000/transporteurs`)
}

// POST – Choisir un transporteur pour une commande
export async function choisirTransporteur(commandeId, data) {
    return await axios.post(`http://localhost:5000/commandes/${commandeId}/transporteur`, data)
}
