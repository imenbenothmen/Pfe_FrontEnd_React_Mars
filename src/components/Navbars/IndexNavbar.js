/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

// components
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const user = getCurrentUser();
  const isAdmin = user && user.role === "admin";
  const isClient = user && user.role === "client";

  const history = useHistory();

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/welcome");
    window.location.reload();
  };

  // Fermer le dropdown client si on clique à l'extérieur
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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

        .luxury-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'Inter', sans-serif;
          backdrop-filter: blur(20px);
        }

        .navbar-transparent {
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid rgba(212, 196, 154, 0.2);
          box-shadow: 0 2px 20px rgba(139, 115, 85, 0.08);
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.98);
          border-bottom: 1px solid rgba(212, 196, 154, 0.3);
          box-shadow: 0 4px 30px rgba(139, 115, 85, 0.15);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          transition: padding 0.3s ease;
        }

        .navbar-scrolled .navbar-container {
          padding: 0.75rem 2rem;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .navbar-brand:hover {
          transform: scale(1.05);
        }

        .brand-logo {
          width: 45px;
          height: 45px;
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          box-shadow: 0 4px 15px rgba(185, 157, 98, 0.3);
          transition: all 0.3s ease;
        }

        .navbar-brand:hover .brand-logo {
          box-shadow: 0 6px 25px rgba(185, 157, 98, 0.4);
          transform: rotate(5deg);
        }

        .brand-icon {
          color: white;
          font-size: 20px;
        }

        .brand-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(45deg, #b99d62, #d4c49a, #8b7355);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .navbar-menu {
          display: none;
          align-items: center;
          gap: 1rem;
        }

        .navbar-menu.desktop {
          display: flex;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background: rgba(212, 196, 154, 0.1);
          border: 1px solid rgba(212, 196, 154, 0.3);
          border-radius: 50%;
          color: #8b7355;
          font-size: 18px;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          cursor: pointer;
        }

        .action-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 196, 154, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .action-btn:hover::before {
          left: 100%;
        }

        .action-btn:hover {
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          color: white;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(212, 196, 154, 0.4);
        }

        .search-input {
          padding: 0.5rem 1rem;
          border-radius: 25px;
          border: 1px solid rgba(212, 196, 154, 0.3);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #5a4a3a;
          margin-left: 0.5rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #b99d62;
          box-shadow: 0 0 15px rgba(185, 157, 98, 0.2);
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          gap: 4px;
        }

        .mobile-menu-bar {
          width: 25px;
          height: 3px;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.active .mobile-menu-bar:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .mobile-menu-btn.active .mobile-menu-bar:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active .mobile-menu-bar:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(212, 196, 154, 0.3);
          box-shadow: 0 8px 30px rgba(139, 115, 85, 0.15);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(212, 196, 154, 0.2);
        }

        .client-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 196, 154, 0.3);
          border-radius: 15px;
          box-shadow: 0 8px 30px rgba(139, 115, 85, 0.15);
          min-width: 180px;
          z-index: 1000;
          overflow: hidden;
        }

        .client-dropdown a,
        .client-dropdown button {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          color: #5a4a3a;
          text-decoration: none;
          background: none;
          border: none;
          text-align: left;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .client-dropdown a:hover,
        .client-dropdown button:hover {
          background: linear-gradient(45deg, rgba(212, 196, 154, 0.15), rgba(232, 220, 198, 0.1));
          color: #b99d62;
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid rgba(212, 196, 154, 0.5);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .user-avatar:hover {
          border-color: #b99d62;
          transform: scale(1.05);
        }

        .login-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .login-btn:hover {
          background: linear-gradient(45deg, #b99d62, #8b7355);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(185, 157, 98, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .navbar-menu.desktop {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 1rem;
          }
          
          .navbar-scrolled .navbar-container {
            padding: 0.75rem 1rem;
          }
          
          .brand-text {
            font-size: 1.5rem;
          }
          
          .brand-logo {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          
          .action-btn {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          
          .user-avatar {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .brand-text {
            font-size: 1.3rem;
          }
          
          .navbar-actions {
            gap: 0.5rem;
          }
        }
      `}</style>

      <nav className={`luxury-navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="navbar-container">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <div className="brand-logo">
              <i className="fas fa-gem brand-icon"></i>
            </div>
            <span className="brand-text">KARMA JEWELRY</span>
          </Link>

          {/* Desktop Menu - Vide pour l'instant, peut être étendu plus tard */}
          <div className="navbar-menu desktop">
            {/* Menu items peuvent être ajoutés ici si nécessaire */}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Actions pour clients uniquement */}
            {!isAdmin && (
              <>
                {/* Recherche */}
                <button className="action-btn" onClick={toggleSearch}>
                  <i className="fas fa-search" />
                </button>

                {searchVisible && (
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="search-input"
                  />
                )}

                {/* Favoris */}
                <Link to="/favorites" className="action-btn">
                  <i className="fas fa-heart" />
                </Link>

                {/* Panier */}
                <Link to="/carts" className="action-btn">
                  <i className="fas fa-shopping-bag" />
                </Link>
              </>
            )}

            {/* Connexion visible uniquement si aucun user n'est connecté */}
            {!user && (
              <Link to="/auth" className="login-btn">
                <i className="fas fa-user" />
                <span className="lg:inline hidden">Login</span>
              </Link>
            )}

            {/* Avatar client avec dropdown au clic */}
            {isClient && (
              <div className="relative" ref={dropdownRef}>
                <img
                  src={user.user_image || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="user-avatar"
                  onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                />
                {clientDropdownOpen && (
                  <div className="client-dropdown">
                    <Link
                      to="/profile"
                      onClick={() => setClientDropdownOpen(false)}
                    >
                      Mon profil
                    </Link>
                    <button
                      onClick={() => {
                        setClientDropdownOpen(false);
                        handleLogout();
                      }}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Avatar admin */}
            {isAdmin && (
              <div className="flex items-center">
                <UserDropdown />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className={`mobile-menu-btn ${navbarOpen ? 'active' : ''}`}
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <div className="mobile-menu-bar"></div>
              <div className="mobile-menu-bar"></div>
              <div className="mobile-menu-bar"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${navbarOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {/* Actions mobiles pour clients */}
            {!isAdmin && (
              <div className="mobile-actions">
                <button className="action-btn" onClick={toggleSearch}>
                  <i className="fas fa-search" />
                </button>
                <Link to="/favorites" className="action-btn">
                  <i className="fas fa-heart" />
                </Link>
                <Link to="/carts" className="action-btn">
                  <i className="fas fa-shopping-bag" />
                </Link>
              </div>
            )}

            {/* Actions mobiles pour utilisateurs non connectés */}
            {!user && (
              <div className="mobile-actions">
                <Link to="/auth" className="login-btn">
                  <i className="fas fa-user" />
                  <span>Login</span>
                </Link>
              </div>
            )}

            {/* Actions mobiles pour clients connectés */}
            {isClient && (
              <div className="mobile-actions">
                <Link to="/profile" className="action-btn">
                  <i className="fas fa-user" />
                </Link>
                <button className="action-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}