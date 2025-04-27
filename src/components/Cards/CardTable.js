import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers, deleteUserById, addUserClient, addUserLivreur,addUserAdmin, updateUserById } from "../../services/ApiUser"; //1 importation

// components

// import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTable({ color }) {

  const [users, setUsers] = useState([""]) //2 const (get)

  const getUsers = async () => {
    //3 fct getUsers
    try {
      console.log("data :")
      await getAllUsers().then((res) => {        
        setUsers(res.data.userListe);
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getUsers(); }, []);

  //--------------add-----------------
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "client", // valeur par défaut pour le rôle
    delivery_address: "",
    numeroCarteFidelite: "",
    createdAt: "",
    phone: "",
    user_image: "client.png",
  });
  
  // Met à jour dynamiquement l'objet newUser quand l'utilisateur modifie un champ du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

 // const AddNewUser = async () => {
   // try {
     // await addUserClient(newUser);
      //getUsers();
    //} catch (error) {
     // console.log(error);
   // }
  //};

  const AddNewUser = async () => {
    try {
      if (newUser.role === "client") {
        await addUserClient(newUser);  // Ajouter un client
      } else if (newUser.role === "admin") {
        await addUserAdmin(newUser);   // Ajouter un admin
      } else if (newUser.role === "livreur") {
        await addUserLivreur(newUser); // Ajouter un livreur
      }
  
      getUsers();  // Rafraîchir la liste des utilisateurs
    } catch (error) {
      console.log(error);
    }
  };
  

  const updateNewUser = async (newUser, id) => {
    try {
      await updateUserById(id, newUser);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List Users
              </h3>
              <div>
                <input
                  type="text"
                  placeholder="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                  onChange={handleChange}
                />

                {/* Sélection du rôle */}
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring mr-2 ease-linear transition-all duration-150"
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                  <option value="livreur">Livreur</option>
                </select>

                <br></br>
                <button
                  onClick={() => {
                    AddNewUser(newUser);
                  }}
                  className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  AddUser
                </button>
                
                <button
                  onClick={() => {
                    updateNewUser(newUser, newUser._id);
                  }}
                  className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          {/* Table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {["Username", "Email", "Phone", "Delivery Address", "Role", "Date d'inscription", "Actions"].map((header) => (
                  <th
                    key={header}
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.username}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.phone}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.delivery_address}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.role}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <button
                      className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md mr-2 ease-linear transition-all duration-150"
                      onClick={() => setNewUser(user)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
