/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";



// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";




export default function Navbar(props) {


  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [searchVisible, setSearchVisible] = useState(false); // Gérer la visibilité du champ de recherche
  // Fonction pour afficher/masquer le champ de recherche
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
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


          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index-navbar"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs
                </a>
              </li>
            </ul> */}
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>


              {/* <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li> */}





              {/* <li className="flex items-center">
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li> */}

              {/* Connexion */}
              <li className="flex items-center">
                <Link
                  to="/auth/register" // Lien vers la page de connexion
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  {/* Icône cercle avec icône utilisateur */}
                  
                
                    <div>
                  
                     <i className="fas fa-user text-blueGray-700 text-lg"/>
                     
    </div>

                  
                  <span className="lg:hidden inline-block ml-2">Login</span>
                </Link>
              </li>






              {/* Icône de recherche */}
              <li className="flex items-center">
                <button
                  className="text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  onClick={toggleSearch} // Lorsqu'on clique sur l'icône de recherche, on affiche/masque le champ
                >
                  <i className="fas fa-search text-lg leading-lg" />
                  <span className="lg:hidden inline-block ml-2">search</span>
                </button>
              </li>

              {/* Champ de recherche */}
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
    to="/favorites" // Lien vers la page des favoris
    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
  >
    {/* Icône cercle avec icône de favoris */}
    
      <i className="fas fa-heart text-blueGray-700 text-lg" /> {/* Icône de cœur */}
    
    <span className="lg:hidden inline-block ml-2">Favorites</span> {/* Texte caché sur mobile */}
  </Link>
</li>


              {/* Icône du panier */}
              <li className="flex items-center">
                <Link
                  to="/cart"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i className="fas fa-shopping-cart text-lg leading-lg" />
                  <span className="lg:hidden inline-block ml-2">cart</span>
                </Link>
              </li>

              

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
