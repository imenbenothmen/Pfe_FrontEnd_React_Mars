import axios from 'axios';

const apiurl = 'http://localhost:5000/categories';

// ✅ POST – Ajouter une catégorie ou sous-catégorie
export async function addCategory(data) {
  return await axios.post(`${apiurl}/addCategory`, data);
}

// ✅ DELETE – Supprimer une catégorie par ID
export async function deleteCategory(id) {
  return await axios.delete(`${apiurl}/deleteCategory/${id}`);
}

// ✅ GET – Récupérer toutes les catégories
export async function getCategories() {
  return await axios.get(`${apiurl}/getCategories`);
}

// ✅ GET – Obtenir les détails d’une catégorie par ID
export async function getCategoryDetails(id) {
  return await axios.get(`${apiurl}/getCategoryDetails/${id}`);
}

// ✅ PUT – Renommer une catégorie
export async function renameCategory(id, data) {
  return await axios.put(`${apiurl}/renameCategory/${id}`, data);
}

// ✅ PUT – Mettre à jour complètement une catégorie (nom, description, parent)
export async function updateCategory(id, data) {
  return await axios.put(`${apiurl}/updateCategory/${id}`, data);
}

// ✅ GET – Obtenir les sous-catégories d’une catégorie par ID de parent
export async function getSubCategories(parentId) {
  return await axios.get(`${apiurl}/getSubCategories/${parentId}`);
}

// ✅ GET – Obtenir uniquement les catégories principales (sans parent)
export async function getMainCategories() {
  return await axios.get(`${apiurl}/getMainCategories`);
}
