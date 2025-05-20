import axios from 'axios'

const apiurl = 'http://localhost:5000/products'


//export async function addProduct(produitData) {
  //  return await axios.post(`${apiurl}/addProduct`, produitData)
//}
export async function addProduct(produitData) {
  return await axios.post(`${apiurl}/addProduct`, produitData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}


// DELETE – Supprimer un produit par ID
export async function deleteProduct(id) {
    return await axios.delete(`${apiurl}/deleteProduct/${id}`)
}

// GET – Afficher tous les produits
export async function getAllProducts() {
    return await axios.get(`${apiurl}/getAllProducts`)
}

// GET – Afficher les détails d'un produit par ID
export async function getProductDetails(id) {
    return await axios.get(`${apiurl}/getProductDetails/${id}`)
}

// GET – Obtenir le nombre de produits dans une catégorie
export async function getProductCountByCategory(categorieId) {
    return await axios.get(`${apiurl}/getProductCountByCategory/${categorieId}`)
}

// GET – Obtenir le nom d’un produit par ID
export async function getProductName(id) {
    return await axios.get(`${apiurl}/getProductName/${id}`)
}

// PUT – Mettre à jour un produit par ID
//export async function updateProduct(id, produitData) {
  //  return await axios.put(`${apiurl}/updateProduct/${id}`, produitData)
//}
// produitData est un FormData (avec image si uploadée)
export async function updateProduct(id, produitData) {
  return await axios.put(`${apiurl}/updateProduct/${id}`, produitData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
