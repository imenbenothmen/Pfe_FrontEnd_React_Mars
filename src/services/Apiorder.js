import axios from 'axios';

const apiUrl = 'http://localhost:5000';
//const apiurl = "http://localhost:5000/orders";

// GET – Get all orders (for admin)
export async function getAllOrders() {
  return await axios.get(`${apiUrl}/orders`);
}


// POST – Create an order
export async function createOrder(data) {
  return await axios.post(`${apiUrl}/order`, data);
}

// GET – Get all orders for a specific client
export async function getOrdersByClient(clientId) {
  return await axios.get(`${apiUrl}/orders/${clientId}`);
}

// PUT – Update the status of an order
export async function updateOrderStatus(orderId, data) {
  return await axios.put(`${apiUrl}/order/${orderId}/status`, data);
}

// PUT – Cancel an order
export async function cancelOrder(orderId) {
  return await axios.put(`${apiUrl}/order/${orderId}/cancel`);
}

// GET – Get order details
export async function getOrderDetails(orderId) {
  return await axios.get(`${apiUrl}/order/${orderId}`);
}

// GET – Track an order in real-time
export async function trackOrder(orderId) {
  return await axios.get(`${apiUrl}/order/${orderId}/track`);
}

// POST – Notify user when order status changes
export async function notifyStatusChange(orderId, data) {
  return await axios.post(`${apiUrl}/order/${orderId}/notify`, data);
}

// PUT – Edit an order before it is shipped
export async function modifyOrderBeforeShipment(orderId, data) {
  return await axios.put(`${apiUrl}/order/${orderId}/edit`, data);
}

// GET – Get the order history of a specific user
export async function getOrderHistory(userId) {
  return await axios.get(`${apiUrl}/orders/history/${userId}`);
}

// GET – Get full details of a specific order (redundant version)
export async function getOrderDetailsById(orderId) {
  return await axios.get(`${apiUrl}/orders/details/${orderId}`);
}

