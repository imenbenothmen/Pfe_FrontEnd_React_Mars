import axios from 'axios';

const apiurl = 'http://localhost:5000/reviews'; // correspond à ta route backend

// POST – Laisser un avis (doit être connecté)
export async function laisserAvis(data) {
  return await axios.post(`${apiurl}/addReview`, data, { withCredentials: true });
  // withCredentials pour envoyer les cookies (token JWT)
}

// GET – Récupérer tous les avis d’un produit
export async function afficherAvis(produitId) {
  return await axios.get(`${apiurl}/getReviews/${produitId}`);
}
