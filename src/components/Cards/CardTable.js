import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getAllUsers,
  deleteUserById,
  addUserClient,
  addUserAdmin,
  updateUserById,
} from "../../services/ApiUser";

export default function CardTable({ color }) {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});

  const getUsers = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await getAllUsers();
      setUsers(response.data.userListe);
    } catch (error) {
      setErrorMsg("Erreur lors de la récupération des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Confirmez-vous la suppression de cet utilisateur ?")) return;
    try {
      await deleteUserById(id);
      getUsers();
    } catch (error) {
      setErrorMsg("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
    delivery_address: "",
    phone: "",
    user_image: "client.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role" && value === "admin") {
      setNewUser({ ...newUser, role: value, delivery_address: "" });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const validateNewUser = () => {
    if (!newUser.username.trim()) return false;
    if (!newUser.email.trim()) return false;
    if (!newUser.password.trim()) return false;
    if (newUser.role === "client" && !newUser.delivery_address.trim()) return false;
    return true;
  };

  const addNewUser = async () => {
    if (!validateNewUser()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    try {
      if (newUser.role === "client") {
        await addUserClient(newUser);
      } else {
        await addUserAdmin(newUser);
      }
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "client",
        delivery_address: "",
        phone: "",
        user_image: "client.png",
      });
      getUsers();
    } catch (error) {
      setErrorMsg("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  // Gérer l'édition inline
  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditingUserData({ ...user });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditingUserData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUserData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value === "admin" ? { delivery_address: "" } : {}),
    }));
  };

  const saveEdit = async () => {
    try {
      await updateUserById(editingUserId, editingUserData);
      setEditingUserId(null);
      setEditingUserData({});
      getUsers();
    } catch (error) {
      setErrorMsg("Erreur lors de la mise à jour.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole === "all" || user.role === filterRole;
    const searchMatch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return roleMatch && searchMatch;
  });

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <h3
          className={
            "font-semibold text-lg " +
            (color === "light" ? "text-blueGray-700" : "text-white")
          }
        >
          Gestion des utilisateurs
        </h3>

        {errorMsg && (
          <div className="text-red-600 mb-2 font-semibold">{errorMsg}</div>
        )}

        <div className="my-3 flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black placeholder-gray-500 bg-white"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black placeholder-gray-500 bg-white"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black placeholder-gray-500 bg-white"
          />
          <input
            type="text"
            placeholder="Téléphone"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black placeholder-gray-500 bg-white"
          />
          {newUser.role === "client" && (
            <input
              type="text"
              placeholder="Adresse de livraison"
              name="delivery_address"
              value={newUser.delivery_address}
              onChange={handleChange}
              className="border px-3 py-2 rounded text-black placeholder-gray-500 bg-white"
            />
          )}
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black bg-white"
          >
            <option value="client">Client</option>
            <option value="admin">Administrateur</option>
          </select>
          <button
            onClick={addNewUser}
            disabled={!validateNewUser()}
            className={`px-4 py-2 rounded ml-3 text-white ${
              validateNewUser() ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Ajouter utilisateur
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border px-3 py-2 rounded text-black bg-white"
          >
            <option value="all">Tous les rôles</option>
            <option value="client">Clients</option>
            <option value="admin">Administrateurs</option>
          </select>

          <input
            type="text"
            placeholder="Rechercher par nom ou email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded text-black placeholder-gray-500 bg-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center p-4">Chargement...</div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">Nom d'utilisateur</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Téléphone</th>
                <th className="border px-4 py-2">Adresse de livraison</th>
                <th className="border px-4 py-2">Rôle</th>
                <th className="border px-4 py-2">Date d'inscription</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="username"
                          value={editingUserData.username}
                          onChange={handleEditChange}
                          className="border rounded px-1 py-0.5 text-black"
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="email"
                          name="email"
                          value={editingUserData.email}
                          onChange={handleEditChange}
                          className="border rounded px-1 py-0.5 text-black"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          name="phone"
                          value={editingUserData.phone || ""}
                          onChange={handleEditChange}
                          className="border rounded px-1 py-0.5 text-black"
                        />
                      ) : (
                        user.phone || "-"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        editingUserData.role === "client" ? (
                          <input
                            type="text"
                            name="delivery_address"
                            value={editingUserData.delivery_address || ""}
                            onChange={handleEditChange}
                            className="border rounded px-1 py-0.5 text-black"
                          />
                        ) : (
                          "-"
                        )
                      ) : (
                        user.delivery_address || "-"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        <select
                          name="role"
                          value={editingUserData.role}
                          onChange={handleEditChange}
                          className="border rounded px-1 py-0.5 text-black bg-white"
                        >
                          <option value="client">Client</option>
                          <option value="admin">Administrateur</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 space-x-1">
                      {editingUserId === user._id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded"
                          >
                            Sauvegarder
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(user)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-3 rounded"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded"
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
