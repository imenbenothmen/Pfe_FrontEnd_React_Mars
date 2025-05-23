import React from "react";

export default function FooterSmall(props) {
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

        .footer-container {
          padding: 40px 0;
        }

        .footer-container hr {
          border-color: rgba(212, 196, 154, 0.3);
        }

        .footer-container .text-blueGray-500 {
          color: #a19388;
        }

        .footer-container .text-white {
          color: #d4c49a;
          transition: all 0.3s ease;
        }

        .footer-container .text-white:hover {
          color: #e8dcc6;
        }

        .footer-container ul li a {
          padding: 5px 15px;
          border-radius: 20px;
          background: linear-gradient(45deg, rgba(212, 196, 154, 0.1), rgba(232, 220, 198, 0.05));
          transition: all 0.3s ease;
        }

        .footer-container ul li a:hover {
          background: linear-gradient(45deg, #d4c49a, #b99d62);
          color: #2c2826;
          transform: translateY(-2px);
        }
      `}</style>

      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 luxury-footer"
            : "fixed w-full bottom-0 luxury-footer") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="/"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
                >
                  KARMA Jewelry
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center">
                <li>
                  <a
                    href="/"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    KARMA Jewelry
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    À propos de nous
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Conditions générales
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
