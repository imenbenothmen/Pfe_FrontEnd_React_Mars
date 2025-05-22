import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link, useHistory } from "react-router-dom"; // useHistory pour v5
import { logout } from "../../services/ApiUser";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);
  const history = useHistory(); // hook pour redirection en v5

  // Récupérer user dans localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("UserDropdown user:", user);

  // Ouvrir le dropdown et créer Popper
  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
      });
      setDropdownPopoverShow(true);
    }
  };

  // Fermer le dropdown
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Gérer la déconnexion
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.removeItem("user");
      history.push("/login"); // redirection en v5
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  // Gestion du clic en dehors pour fermer le dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverDropdownRef.current &&
        !popoverDropdownRef.current.contains(event.target) &&
        btnDropdownRef.current &&
        !btnDropdownRef.current.contains(event.target)
      ) {
        closeDropdownPopover();
      }
    };

    if (dropdownPopoverShow) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownPopoverShow]);

  return (
    <>
      <a
        className="text-blueGray-500 block cursor-pointer"
        href="#!"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="User avatar"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/team-1-800x800.jpg").default}
            />
          </span>
        </div>
      </a>

      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {user && user.role === "admin" ? (
          <>
            <Link
              to="/admin/tables"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Gestion des utilisateurs
            </Link>

            <Link
              to="/admin/produits-categories"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Gestion des produits et categories
            </Link>

            <Link
              to="/admin/commandes-reclamations"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Gestion des commandes et reclamations
            </Link>

            <Link
              to="/admin/dashboard"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Tableau de bord
            </Link>
          </>
        ) : (
          // Menu client ou autre rôle
          <>
            <Link
              to="/profile"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Mon profil
            </Link>

            <Link
              to="/"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Page d'accueil
            </Link>

            <Link
              to="/landing"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
              onClick={closeDropdownPopover}
            >
              Pages des produits
            </Link>
          </>
        )}

        <div className="h-0 my-2 border border-solid border-blueGray-100" />

        <a
          href="#!"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
          onClick={handleLogout}
        >
          Déconnexion
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
