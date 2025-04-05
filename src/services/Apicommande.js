import axios from 'axios'

const apiurl = 'http://localhost:5000'

// POST – Créer une commande
export async function createCommande(data) {
    return await axios.post(`${apiurl}/commande`, data)
}

// GET – Récupérer toutes les commandes d’un client
export async function getCommandesByClient(clientId) {
    return await axios.get(`${apiurl}/commandes/${clientId}`)
}

// PUT – Modifier le statut d’une commande
export async function updateStatutCommande(commandeId, data) {
    return await axios.put(`${apiurl}/commande/${commandeId}/statut`, data)
}

// PUT – Annuler une commande
export async function annulerCommande(commandeId) {
    return await axios.put(`${apiurl}/commande/${commandeId}/annuler`)
}

// GET – Afficher les détails d’une commande
export async function getCommandeDetails(commandeId) {
    return await axios.get(`${apiurl}/commande/${commandeId}`)
}

// GET – Suivi d'une commande en temps réel
export async function suiviCommande(commandeId) {
    return await axios.get(`${apiurl}/commande/${commandeId}/suivi`)
}

// POST – Envoyer une notification lors du changement de statut
export async function notifierChangementStatut(commandeId, data) {
    return await axios.post(`${apiurl}/api/commande/${commandeId}/notifier`, data)
}

// PUT – Modifier une commande avant expédition
export async function modifierCommandeAvantExpedition(commandeId, data) {
    return await axios.put(`${apiurl}/api/commande/${commandeId}/modifier`, data)
}

// GET – Historique des commandes d’un utilisateur
export async function historiqueCommandes(userId) {
    return await axios.get(`${apiurl}/api/commandes/${userId}`)
}

// GET – Afficher les détails d’une commande spécifique (copie avec autre route)
export async function detailsCommande(commandeId) {
    return await axios.get(`${apiurl}/api/commande/${commandeId}`)
}
