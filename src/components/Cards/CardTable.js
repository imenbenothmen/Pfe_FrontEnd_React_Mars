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
        .luxury-btn.red {
          background: linear-gradient(45deg, #ff8a80, #ff5252);
          color: #fff;
        }
        .luxury-btn.red:hover {
          background: linear-gradient(45deg, #ff5252, #ff8a80);
        }
        .luxury-btn.gray {
          background: #f9f7f4;
          color: #8b7355;
        }
        .luxury-btn.gray:hover {
          background: #e8e3dd;
        }
        .luxury-input, .luxury-select {
          border: 1.5px solid #d4c49a;
          border-radius: 18px;
          padding: 10px 16px;
          font-size: 1rem;
          margin: 0 6px 10px 0;
          font-family: 'Inter', sans-serif;
          background: #f9f7f4;
          transition: border 0.2s;
        }
        .luxury-input:focus, .luxury-select:focus {
          border-color: #b99d62;
          outline: none;
          background: #fffbe9;
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
        <h3 className="luxury-title">Gestion des utilisateurs</h3>
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
            className="luxury-input"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="luxury-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            className="luxury-input"
          />
          <input
            type="text"
            placeholder="Téléphone"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            className="luxury-input"
          />
          {newUser.role === "client" && (
            <input
              type="text"
              placeholder="Adresse de livraison"
              name="delivery_address"
              value={newUser.delivery_address}
              onChange={handleChange}
              className="luxury-input"
            />
          )}
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="luxury-select"
          >
            <option value="client">Client</option>
            <option value="admin">Administrateur</option>
          </select>
          <button
            onClick={addNewUser}
            disabled={!validateNewUser()}
            className={`luxury-btn green ${!validateNewUser() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Ajouter utilisateur
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="luxury-select"
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
            className="luxury-input"
          />
        </div>
        <div className="overflow-x-auto mt-4">
          {loading ? (
            <div className="text-center p-4">Chargement...</div>
          ) : (
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Nom d'utilisateur</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Adresse de livraison</th>
                  <th>Rôle</th>
                  <th>Date d'inscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            name="username"
                            value={editingUserData.username}
                            onChange={handleEditChange}
                            className="luxury-input"
                            style={{ minWidth: 80 }}
                          />
                        ) : (
                          user.username
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="email"
                            name="email"
                            value={editingUserData.email}
                            onChange={handleEditChange}
                            className="luxury-input"
                            style={{ minWidth: 120 }}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            name="phone"
                            value={editingUserData.phone || ""}
                            onChange={handleEditChange}
                            className="luxury-input"
                            style={{ minWidth: 80 }}
                          />
                        ) : (
                          user.phone || "-"
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          editingUserData.role === "client" ? (
                            <input
                              type="text"
                              name="delivery_address"
                              value={editingUserData.delivery_address || ""}
                              onChange={handleEditChange}
                              className="luxury-input"
                              style={{ minWidth: 120 }}
                            />
                          ) : (
                            "-"
                          )
                        ) : (
                          user.delivery_address || "-"
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <select
                            name="role"
                            value={editingUserData.role}
                            onChange={handleEditChange}
                            className="luxury-select"
                          >
                            <option value="client">Client</option>
                            <option value="admin">Administrateur</option>
                          </select>
                        ) : (
                          user.role
                        )}
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="luxury-btn green"
                            >
                              Sauvegarder
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="luxury-btn gray"
                            >
                              Annuler
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(user)}
                              className="luxury-btn yellow"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="luxury-btn red"
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
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
