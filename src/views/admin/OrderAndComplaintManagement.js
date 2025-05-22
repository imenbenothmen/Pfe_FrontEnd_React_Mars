import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/Apiorder";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erreur lors du chargement des commandes :", err));
  }, []);

  const handleMarkOrderAsCompleted = async (id) => {
    try {
      await updateOrderStatus(id, { status: "traitée" });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "traitée" } : order
        )
      );
    } catch (error) {
      console.error("Erreur lors du traitement de la commande :", error);
    }
  };

  const renderOrdersTable = () => (
    <table className="min-w-full text-sm text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Client</th>
          <th className="p-2">Produits</th>
          <th className="p-2">Total</th>
          <th className="p-2">Date</th>
          <th className="p-2">Statut</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b">
            <td className="p-2">{order.client?.email}</td>
            <td className="p-2">{order.products.length} articles</td>
            <td className="p-2">{order.total} DT</td>
            <td className="p-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
            <td className="p-2">{order.status}</td>
            <td className="p-2 space-x-2">
              {order.status !== "traitée" && (
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handleMarkOrderAsCompleted(order._id)}
                >
                  Marquer comme traitée
                </button>
              )}
              <button className="text-blue-600 hover:underline">Éditer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Gestion des Commandes</h2>
      <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
        {renderOrdersTable()}
      </div>
    </div>
  );
}
