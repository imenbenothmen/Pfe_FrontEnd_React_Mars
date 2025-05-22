/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

// components
// import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const user = getCurrentUser();
  const isAdmin = user && user.role === "admin";
  const isClient = user && user.role === "client";

  const history = useHistory();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/welcome");
    window.location.reload();
  };

  // Fermer le dropdown client si on clique à l’extérieur
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClientDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          {/* Gauche : logo + menu hamburger */}
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              KARMA JEWELRY
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* Centre + droite */}
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {/* Recherche + favoris + panier (pour client uniquement) */}
              {!isAdmin && (
                <>
                  {/* Recherche */}
                  <li className="flex items-center">
                    <button
                      className="text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      onClick={toggleSearch}
                    >
                      <i className="fas fa-search text-lg leading-lg" />
                      <span className="lg:hidden inline-block ml-2">search</span>
                    </button>
                  </li>

                  {searchVisible && (
                    <li className="flex items-center">
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="px-3 py-2 rounded border border-gray-300"
                      />
                    </li>
                  )}

                  {/* Favoris */}
                  <li className="flex items-center">
                    <Link
                      to="/favorites"
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    >
                      <i className="fas fa-heart text-blueGray-700 text-lg" />
                      <span className="lg:hidden inline-block ml-2">Favorites</span>
                    </Link>
                  </li>

                  {/* Panier */}
                  <li className="flex items-center">
                    <Link
                      to="/carts"
                      className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    >
                      <i className="fas fa-shopping-cart text-lg leading-lg" />
                      <span className="lg:hidden inline-block ml-2">cart</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Connexion visible uniquement si aucun user n'est connecté */}
              {!user && (
                <li className="flex items-center">
                  <Link
                    to="/auth"
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  >
                    <i className="fas fa-user text-blueGray-700 text-lg" />
                    <span className="lg:hidden inline-block ml-2">Login</span>
                  </Link>
                </li>
              )}

              {/* Avatar client avec dropdown au clic */}
              {isClient && (
                <li className="relative flex items-center" ref={dropdownRef}>
                  <button
                    className="flex items-center px-3 py-4 lg:py-2 text-xs uppercase font-bold text-blueGray-700 focus:outline-none"
                    onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                  >
                    <img
                      src={user.user_image || "https://i.pravatar.cc/40"}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  {clientDropdownOpen && (
                    <ul className="absolute right-0 top-12 bg-white shadow-md rounded z-50 min-w-[140px]">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setClientDropdownOpen(false)}
                        >
                          Mon profil
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setClientDropdownOpen(false);
                            handleLogout();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Déconnexion
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              )}

              {/* Avatar admin */}
              {isAdmin && (
                <li className="flex items-center">
                  <UserDropdown />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
