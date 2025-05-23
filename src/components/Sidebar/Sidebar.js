/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const user = { role: "Admin" };
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [isScrolled, setIsScrolled] = useState(false);

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

        .luxury-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          width: 250px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          border-right: 1px solid rgba(212, 196, 154, 0.2);
          box-shadow: 0 2px 20px rgba(139, 115, 85, 0.08);
          font-family: 'Inter', sans-serif;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .sidebar-container {
          display: flex;
          flex-direction: column;
          align-items: start;
          padding: 1rem 2rem;
          height: 100%;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-bottom: 2rem;
          transition: transform 0.3s ease;
        }

        .sidebar-brand:hover {
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

        .sidebar-brand:hover .brand-logo {
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

        .sidebar-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(212, 196, 154, 0.1);
          border-radius: 25px;
          color: #5a4a3a;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          width: 100%;
        }

        .sidebar-link:hover {
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(185, 157, 98, 0.3);
        }

        .sidebar-divider {
          margin: 1.5rem 0;
          border-top: 1px solid rgba(212, 196, 154, 0.3);
        }

        @media (max-width: 768px) {
          .luxury-sidebar {
            width: 200px;
          }

          .brand-text {
            font-size: 1.5rem;
          }

          .brand-logo {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
        }
      `}</style>

      <nav className="luxury-sidebar">
        <div className="sidebar-container">
          {/* Brand */}
          <Link to="/" className="sidebar-brand">
            <div className="brand-logo">
              <i className="fas fa-gem brand-icon"></i>
            </div>
            <span className="brand-text">KARMA ADMIN</span>
          </Link>

          {/* Divider */}
          <div className="sidebar-divider"></div>

          {/* Navigation */}
          <ul className="sidebar-actions">
            {user.role === "Admin" && (
              <>
                <Link to="/admin/dashboard" className="sidebar-link">
                  <i className="fas fa-tv"></i> Dashboard
                </Link>
                <Link to="/admin/tables" className="sidebar-link">
                  <i className="fas fa-table"></i> Gestion Utilisateurs
                </Link>
                <Link to="/admin/produits-categories" className="sidebar-link">
                  <i className="fas fa-box"></i> Gestion Produits & Catégories
                </Link>
                <Link to="/admin/commandes" className="sidebar-link">
                  <i className="fas fa-shopping-cart"></i> Gestion Commandes
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
