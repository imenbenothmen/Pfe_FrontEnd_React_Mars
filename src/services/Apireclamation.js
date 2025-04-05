import axios from 'axios'

const apiurl = 'http://localhost:5000/reclamations'

// POST – Soumettre une réclamation
export async function soumettreReclamation(reclamationData) {
    return await axios.post(`${apiurl}`, reclamationData)
}

// GET – Obtenir le statut d'une réclamation
export async function getStatutReclamation(reclamationId) {
    return await axios.get(`${apiurl}/${reclamationId}/statut`)
}

// PUT – Mettre à jour le statut d'une réclamation
export async function mettreAJourStatut(reclamationId, newStatut) {
    return await axios.put(`${apiurl}/${reclamationId}/statut`, { statut: newStatut })
}

// GET – Obtenir les détails d'une réclamation
export async function getDetailsReclamation(reclamationId) {
    return await axios.get(`${apiurl}/${reclamationId}/details`)
}

// PUT – Résoudre une réclamation
export async function resoudreReclamation(reclamationId) {
    return await axios.put(`${apiurl}/${reclamationId}/resoudre`)
}

// PUT – Archiver une réclamation
export async function archiverReclamation(reclamationId) {
    return await axios.put(`${apiurl}/${reclamationId}/archiver`)
}

// DELETE – Supprimer une réclamation
export async function supprimerReclamation(reclamationId) {
    return await axios.delete(`${apiurl}/${reclamationId}`)
}
