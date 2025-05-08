import axios from 'axios';

const apiurl = 'http://localhost:5000/favorites'; // Remplace par l'URL de ton API

export async function add_to_favorites(data) {
  return await axios.post(`${apiurl}/add`, data);
}

export async function remove_from_favorites(data) {
  return await axios.post(`${apiurl}/remove`, data);
}

export async function show_favorites(clientId) {
  return await axios.get(`${apiurl}/show/${clientId}`);
}

export async function check_if_favorite(data) {
  return await axios.post(`${apiurl}/check`, data);
}

export async function count_favorites(clientId) {
  return await axios.get(`${apiurl}/count/${clientId}`);
}

