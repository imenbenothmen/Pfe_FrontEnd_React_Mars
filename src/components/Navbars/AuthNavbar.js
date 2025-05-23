/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Gestion du scroll pour l'effet de transparence
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

        .luxury-auth-navbar {
          position: absolute;
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
          background: rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .navbar-scrolled {
          background: rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
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

        .navbar-left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          position: relative;
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
          box-shadow: 0 4px 15px rgba(212, 196, 154, 0.4);
          transition: all 0.3s ease;
        }

        .navbar-brand:hover .brand-logo {
          box-shadow: 0 6px 25px rgba(212, 196, 154, 0.6);
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
          background: linear-gradient(45deg, #ffffff, #f8f6f3, #d4c49a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
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
          background: linear-gradient(45deg, #ffffff, #d4c49a);
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

        .navbar-menu {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 15px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 1rem;
        }

        .navbar-menu.desktop {
          position: static;
          background: transparent;
          backdrop-filter: none;
          box-shadow: none;
          transform: none;
          opacity: 1;
          visibility: visible;
          margin-top: 0;
          border-radius: 0;
        }

        .navbar-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .navbar-menu-list {
          display: flex;
          flex-direction: column;
          list-style: none;
          margin: 0;
          padding: 1rem;
          width: 100%;
          gap: 0.5rem;
        }

        .navbar-menu.desktop .navbar-menu-list {
          flex-direction: row;
          padding: 0;
          gap: 1rem;
          margin-left: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
        }

        /* Style pour PagesDropdown en mobile */
        .navbar-menu:not(.desktop) .nav-item {
          width: 100%;
        }

        /* Responsive Design */
        @media (min-width: 1024px) {
          .navbar-left {
            width: auto;
          }

          .navbar-menu {
            display: flex !important;
          }

          .navbar-menu.desktop {
            display: flex;
          }
        }

        @media (max-width: 1023px) {
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
        }

        @media (max-width: 480px) {
          .brand-text {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <nav className={`luxury-auth-navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            {/* Brand */}
            <Link to="/" className="navbar-brand">
              <div className="brand-logo">
                <i className="fas fa-gem brand-icon"></i>
              </div>
              <span className="brand-text">KARMA JEWELLERY</span>
            </Link>

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

          {/* Desktop Menu */}
          <div className="navbar-menu desktop">
            <ul className="navbar-menu-list">
              <li className="nav-item">
                <PagesDropdown />
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-menu ${navbarOpen ? 'open' : ''}`}>
          <ul className="navbar-menu-list">
            <li className="nav-item">
              <PagesDropdown />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}