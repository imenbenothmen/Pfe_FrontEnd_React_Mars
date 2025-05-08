// cartapi.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // adapte ça à ton URL backend si besoin

// Créer un panier
export const createCart = (data) => {
  return axios.post(`${apiUrl}/cart`, data);
};

// Récupérer le panier d'un client par ID
export const getCartByClient = (clientId) => {
  return axios.get(`${apiUrl}/cart/client/${clientId}`);
};

// Ajouter un produit au panier
export const addProductToCart = (data) => {
  return axios.post(`${apiUrl}/cart/add`, data);
};

// Supprimer un produit du panier
export const removeProductFromCart = (clientId, productId) => {
  return axios.delete(`${apiUrl}/cart/remove/${clientId}/${productId}`);
};

// Mettre à jour la quantité d'un produit
export const updateQuantityProduct = (data) => {
  return axios.put(`${apiUrl}/cart/update-quantity`, data);
};

// Supprimer tout le panier d'un client
export const deleteCart = (clientId) => {
  return axios.delete(`${apiUrl}/cart/${clientId}`);
};

// Valider la commande
export const validateOrder = (data) => {
  return axios.post(`${apiUrl}/cart/validate`, data);
};

// Afficher le panier d’un client
export const showCart = (clientId) => {
  return axios.get(`${apiUrl}/cart/show/${clientId}`);
};

// Créer ou mettre à jour un panier à la connexion
export const createOrUpdateCart = (userId, cartData) => {
  return axios.post(`${apiUrl}/cart/save/${userId}`, { cart: cartData });
};

// Récupérer le panier d’un utilisateur
export const getCartByUser = (userId) => {
  return axios.get(`${apiUrl}/cart/user/${userId}`);
};

// Ajouter au panier avec vérification du stock
export const addProductToCartWithStockCheck = (data) => {
  return axios.post(`${apiUrl}/cart/add-stock-check`, data);
};

// Vérifier le stock pour plusieurs produits
export const checkStockForCartProducts = (cartProducts) => {
  return axios.post(`${apiUrl}/cart/check-stock`, { cartProducts });
};

// Mettre à jour le panier selon les changements de stock
export const updateCartWithStockChanges = (userId) => {
  return axios.put(`${apiUrl}/cart/update-stock/${userId}`);
};
