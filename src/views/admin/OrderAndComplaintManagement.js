import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/Apiorder";

export default function OrderAndComplaintManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
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
    <table className="luxury-table w-full table-auto border-collapse">
      <thead>
        <tr>
          <th>Client</th>
          <th>Produits</th>
          <th>Total</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.client?.email}</td>
            <td>{order.products.length} articles</td>
            <td>{order.total} DT</td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
              <span
                className={`luxury-status ${
                  order.status === "traitée" ? "done" : "En attente"
                }`}
              >
                {order.status}
              </span>
            </td>
            <td>
              {order.status !== "traitée" && (
                <button
                  className="luxury-btn green"
                  onClick={() => handleMarkOrderAsCompleted(order._id)}
                >
                  Marquer comme traitée
                </button>
              )}
              <button className="luxury-btn yellow">Modifier</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap");
        .luxury-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          border: 1.5px solid #f0ece6;
          padding: 40px 32px 32px 32px;
          max-width: 1100px;
          margin: 40px auto;
          position: relative;
        }
        .luxury-title {
          font-family: "Playfair Display", serif;
          font-size: 2rem;
          font-weight: 700;
          color: #5a4a3a;
          margin-bottom: 2rem;
          text-align: center;
        }
        .luxury-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-family: "Inter", sans-serif;
          background: #fff;
        }
        .luxury-table th,
        .luxury-table td {
          border-bottom: 1.5px solid #f0ece6;
          padding: 14px 12px;
          text-align: left;
        }
        .luxury-table th {
          background: #f9f7f4;
          color: #8b7355;
          font-weight: 600;
          font-size: 1.05rem;
        }
        .luxury-table tr:last-child td {
          border-bottom: none;
        }
        .luxury-btn {
          padding: 8px 18px;
          border-radius: 24px;
          border: none;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          font-size: 0.98rem;
          margin-right: 8px;
          margin-bottom: 4px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(185, 157, 98, 0.08);
        }
        .luxury-btn.green {
          background: linear-gradient(45deg, #b6d7a8, #6fcf97);
          color: #22543d;
        }
        .luxury-btn.green:hover {
          background: linear-gradient(45deg, #6fcf97, #b6d7a8);
        }
        .luxury-btn.yellow {
          background: linear-gradient(45deg, #ffe082, #ffd54f);
          color: #8b7355;
        }
        .luxury-btn.yellow:hover {
          background: linear-gradient(45deg, #ffd54f, #ffe082);
        }
        .luxury-status {
          padding: 4px 16px;
          border-radius: 16px;
          font-size: 0.98rem;
          font-weight: 500;
          background: #f9f7f4;
          color: #8b7355;
        }
        .luxury-status.done {
          background: #e0f7e9;
          color: #388e3c;
        }
        .luxury-status.pending {
          background: #fffbe9;
          color: #b99d62;
        }
        @media (max-width: 900px) {
          .luxury-card {
            padding: 24px 4px 16px 4px;
          }
          .luxury-title {
            font-size: 1.2rem;
          }
          .luxury-table th,
          .luxury-table td {
            padding: 8px 4px;
            font-size: 0.95rem;
          }
        }
      `}</style>
      <div className="luxury-card">
        <h2 className="luxury-title">Gestion des Commandes</h2>
        <div className="overflow-x-auto">{renderOrdersTable()}</div>
      </div>
    </>
  );
}
