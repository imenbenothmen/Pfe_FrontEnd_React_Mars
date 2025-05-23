
import React from "react";

export default function Footer() {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .luxury-footer {
          position: relative;
          background: linear-gradient(135deg, #2c2826 0%, #3a3530 50%, #2c2826 100%);
          color: #e8dcc6;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .luxury-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4c49a, transparent);
        }

        .wave-separator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 80px;
          pointer-events: none;
          overflow: hidden;
          margin-top: -80px;
          transform: translateZ(0);
        }

        .wave-separator svg {
          position: absolute;
          bottom: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .wave-polygon {
          fill: #2c2826;
          opacity: 0.95;
        }

        .footer-main-content {
          padding: 80px 0 40px;
          position: relative;
          z-index: 2;
        }

        .footer-grid {
          display: flex;
          flex-wrap: wrap;
          text-align: center;
        }

        .footer-left-section {
          width: 100%;
          padding: 0 1rem;
          margin-bottom: 60px;
        }

        .footer-brand-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #d4c49a, #e8dcc6, #b99d62);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 8px rgba(212, 196, 154, 0.2);
        }

        .footer-brand-subtitle {
          font-size: 1.2rem;
          color: #a19388;
          margin-bottom: 30px;
          line-height: 1.6;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, rgba(212, 196, 154, 0.15), rgba(232, 220, 198, 0.1));
          border: 2px solid rgba(212, 196, 154, 0.3);
          border-radius: 50%;
          color: #d4c49a;
          font-size: 20px;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(139, 115, 85, 0.1);
        }

        .social-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 196, 154, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .social-btn:hover::before {
          left: 100%;
        }

        .social-btn:hover {
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          color: #2c2826;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(212, 196, 154, 0.4);
          border-color: #d4c49a;
        }

        .footer-right-section {
          width: 100%;
          padding: 0 1rem;
        }

        .footer-links-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-links-column {
          flex: 1;
          min-width: 200px;
          max-width: 250px;
        }

        .footer-column-title {
          display: block;
          text-transform: uppercase;
          color: #d4c49a;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          margin-bottom: 20px;
          letter-spacing: 1px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-column-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          border-radius: 1px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-list li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: #a19388;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          background: transparent;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(212, 196, 154, 0.1), rgba(232, 220, 198, 0.05));
          border-radius: 20px;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: -1;
        }

        .footer-link:hover {
          color: #e8dcc6;
          transform: translateY(-2px);
        }

        .footer-link:hover::before {
          opacity: 1;
        }

        .footer-divider {
          margin: 40px 0 30px;
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 196, 154, 0.3), transparent);
        }

        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding-bottom: 40px;
        }

        .footer-copyright {
          width: 100%;
          text-align: center;
          margin: 0 auto;
        }

        .copyright-text {
          color: #a19388;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 15px 20px;
          background: linear-gradient(45deg, rgba(212, 196, 154, 0.05), rgba(232, 220, 198, 0.02));
          border-radius: 25px;
          border: 1px solid rgba(212, 196, 154, 0.1);
          display: inline-block;
          backdrop-filter: blur(10px);
        }

        .karma-brand {
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        /* Responsive Design */
        @media (min-width: 1024px) {
          .footer-grid {
            text-align: left;
          }

          .footer-left-section {
            width: 50%;
            margin-bottom: 0;
          }

          .footer-brand-title,
          .footer-brand-subtitle {
            text-align: left;
            margin-left: 0;
          }

          .social-links {
            justify-content: flex-start;
          }

          .footer-right-section {
            width: 50%;
          }

          .footer-links-wrapper {
            justify-content: flex-end;
          }

          .footer-column-title::after {
            left: 0;
            transform: none;
          }

          .footer-bottom {
            justify-content: space-between;
          }

          .footer-copyright {
            width: auto;
          }
        }

        @media (max-width: 768px) {
          .footer-brand-title {
            font-size: 2rem;
          }

          .footer-brand-subtitle {
            font-size: 1rem;
          }

          .footer-links-wrapper {
            flex-direction: column;
            gap: 40px;
          }

          .footer-links-column {
            width: 100%;
            max-width: none;
          }

          .social-links {
            gap: 15px;
          }

          .social-btn {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .footer-main-content {
            padding: 60px 0 30px;
          }

          .footer-brand-title {
            font-size: 1.8rem;
          }

          .footer-links-wrapper {
            gap: 30px;
          }
        }
      `}</style>

      <footer className="luxury-footer">
        <div className="wave-separator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="wave-polygon"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="footer-main-content">
            <div className="footer-grid">
              <div className="footer-left-section">
                <h4 className="footer-brand-title">Restez connectés avec nous</h4>
                <h5 className="footer-brand-subtitle">
                  Trouvez-nous sur ces plateformes, nous répondons sous 1 à 2 jours ouvrables.
                </h5>
                
                <div className="social-links">
                  <a
                    href="https://www.instagram.com/jewelry.karma/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61570168573423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </div>
              </div>

              <div className="footer-right-section">
                <div className="footer-links-wrapper">
                  <div className="footer-links-column">
                    <span className="footer-column-title">
                      Liens utiles
                    </span>
                    <ul className="footer-links-list">
                      <li>
                        <a
                          className="footer-link"
                          href="/about"
                        >
                          À propos de nous
                        </a>
                      </li>
                      <li>
                        <a
                          className="footer-link"
                          href="/collections"
                        >
                          Nos collections
                        </a>
                      </li>
                      <li>
                        <a
                          className="footer-link"
                          href="/returns"
                        >
                          Politique de retour
                        </a>
                      </li>
                      <li>
                        <a
                          className="footer-link"
                          href="/blog"
                        >
                          Blog sur les tendances des bijoux
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-links-column">
                    <span className="footer-column-title">
                      Autres ressources
                    </span>
                    <ul className="footer-links-list">
                      <li>
                        <a
                          className="footer-link"
                          href="/shipping-returns"
                        >
                          Livraison et retours
                        </a>
                      </li>
                      <li>
                        <a
                          className="footer-link"
                          href="/loyalty-program"
                        >
                          Programme de fidélité
                        </a>
                      </li>
                      <li>
                        <a
                          className="footer-link"
                          href="/terms"
                        >
                          Conditions générales
                        </a>
                      </li>
                      <li>
                        <a
                          className="footer-link"
                          href="/privacy-policy"
                        >
                          Politique de confidentialité
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
              <div className="footer-copyright">
                <div className="copyright-text">
                  Copyright © {new Date().getFullYear()} <span className="karma-brand">KARMA Jewelry</span> - Tous droits réservés.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}