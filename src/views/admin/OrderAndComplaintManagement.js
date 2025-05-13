import React, { useState, useEffect } from "react";
import { getAllOrders } from "../../services/Apiorder"; // Chemin selon ton projet
import { getAllComplaints } from '../../services/Apicomplaint';


export default function OrderAndComplaintManagement() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Récupérer les commandes
    getAllOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));

    // Récupérer les réclamations
    getAllComplaints()
      .then((res) => {
        setComplaints(res.data);
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  const renderOrdersTable = () => (
    <table className="min-w-full text-sm text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Client</th>
          <th className="p-2">Products</th>
          <th className="p-2">Total</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b">
            <td className="p-2">{order.client?.name}</td>
            <td className="p-2">{order.products.length} items</td>
            <td className="p-2">{order.total} DT</td>
            <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="p-2">{order.status}</td>
            <td className="p-2">
              <button className="text-blue-600 hover:underline">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderComplaintsTable = () => (
    <table className="min-w-full text-sm text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Client</th>
          <th className="p-2">Product</th>
          <th className="p-2">Message</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((comp) => (
          <tr key={comp._id} className="border-b">
            <td className="p-2">{comp.client?.name}</td>
            <td className="p-2">{comp.product?.name || "N/A"}</td>
            <td className="p-2 truncate max-w-xs">{comp.description}</td>
            <td className="p-2">{new Date(comp.createdAt).toLocaleDateString()}</td>
            <td className="p-2">{comp.status}</td>
            <td className="p-2">
              <button className="text-green-600 hover:underline">Handle</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Orders & Complaints Management</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("complaints")}
          className={`px-4 py-2 rounded ${activeTab === "complaints" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Complaints
        </button>
      </div>

      <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
        {activeTab === "orders" ? renderOrdersTable() : renderComplaintsTable()}
      </div>
    </div>
  );
}
