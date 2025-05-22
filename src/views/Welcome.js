/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";

export default function Welcome() {
  return (
    <>
      {/* Luxury style for Welcome page */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .luxury-bg {
          background: linear-gradient(135deg, #fefefe 0%, #f8f6f3 50%, #f5f2ef 100%);
          color: #2c2826;
          font-family: 'Inter', sans-serif;
        }
        .luxury-title {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(45deg, #b99d62, #d4c49a, #8b7355);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(139, 115, 85, 0.1);
        }
        .luxury-section {
          background: linear-gradient(135deg, #ffffff 0%, #f9f7f4 100%);
        }
        .luxury-btn {
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: white !important;
          border-radius: 30px;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(185, 157, 98, 0.3);
          transition: all 0.3s;
        }
        .luxury-btn:hover {
          background: linear-gradient(45deg, #a08854, #c9b086);
          transform: scale(1.04);
        }
        .luxury-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          border: 1px solid #f0ece6;
          transition: all 0.3s;
        }
        .luxury-card:hover {
          box-shadow: 0 20px 40px rgba(185, 157, 98, 0.2);
          border-color: #d4c49a;
          transform: translateY(-8px);
        }
        .luxury-cat {
          background: #fff;
          border: 2px solid #d4c49a;
          color: #8b7355;
          border-radius: 30px;
          font-weight: 500;
          min-width: 180px;
          transition: all 0.3s;
        }
        .luxury-cat:hover, .luxury-cat.active {
          background: linear-gradient(45deg, #d4c49a, #e8dcc6);
          color: #5a4a3a;
          border-color: #b99d62;
          transform: translateY(-2px);
        }
        .luxury-special {
          background: linear-gradient(135deg, #fffbe6 0%, #f9f7f4 100%);
        }
        .luxury-avis {
          background: #fff;
        }
        .luxury-story {
          background: linear-gradient(135deg, #f9f7f4 0%, #fff 100%);
        }
        .luxury-newsletter {
          background: #fff;
        }
      `}</style>

      <div className="luxury-bg">
        <IndexNavbar fixed />

        {/* Hero Section */}
        <section className="relative luxury-section pt-32 pb-20 flex items-center justify-center text-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600185365226-c3e1f0f6a57f')",
            }}
          ></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-5xl font-bold mb-4 luxury-title">
              Révélez votre éclat ✨
            </h1>
            <p className="text-lg text-[#6b5b4f] mb-6">
              Des bijoux qui racontent votre histoire – Élégance, féminité et force.
            </p>
            <Link
              to="/landing"
              className="luxury-btn px-8 py-3 rounded-full text-sm font-bold uppercase"
            >
              Découvrir la collection
            </Link>
          </div>
        </section>

        {/* Produits en vedette */}
        <section className="py-20 luxury-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 luxury-title">
              Nos bijoux en vedette
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  name: "Collier Élégance",
                  price: "89 DT",
                  img: "https://via.placeholder.com/300x300?text=Collier",
                },
                {
                  name: "Bracelet Doré",
                  price: "69 DT",
                  img: "https://via.placeholder.com/300x300?text=Bracelet",
                },
                {
                  name: "Boucles Perles",
                  price: "99 DT",
                  img: "https://via.placeholder.com/300x300?text=Boucles",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="w-full md:w-1/4 text-center luxury-card p-6 hover:shadow-lg transition"
                >
                  <img src={p.img} alt={p.name} className="rounded mb-4" />
                  <h5 className="text-xl font-semibold text-[#5a4a3a]">
                    {p.name}
                  </h5>
                  <p className="text-[#b99d62] font-bold mt-2">{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catégories */}
        <section className="py-20 luxury-section">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-12 luxury-title">
              Nos catégories
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {["Colliers", "Bracelets", "Boucles", "Bagues", "Montres"].map(
                (cat, i) => (
                  <Link
                    key={i}
                    to={`/landing?category=${encodeURIComponent(cat)}`}
                    className="luxury-cat w-40 py-6 px-4 shadow hover:shadow-lg transition duration-300 transform hover:scale-105 text-lg font-medium"
                  >
                    <p>{cat}</p>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* Offre spéciale */}
        <section className="py-16 luxury-special text-center">
          <h2 className="text-3xl font-semibold mb-4 luxury-title">
            Offre spéciale 💝
          </h2>
          <p className="text-lg text-[#6b5b4f]">
            Livraison offerte dès 99 DT - Profitez-en maintenant !
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block luxury-btn px-6 py-3 rounded-full font-bold uppercase text-sm"
          >
            Voir les bijoux
          </Link>
        </section>

        {/* Avis clients */}
        <section className="py-20 luxury-avis">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-12 luxury-title">
              Ce que disent nos clientes
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  name: "Sonia",
                  text: "Magnifiques bijoux, je recommande à 100% !",
                },
                {
                  name: "Leïla",
                  text: "Service rapide et qualité top !",
                },
                {
                  name: "Inès",
                  text: "Mon collier préféré, il ne bouge pas 🥰",
                },
              ].map((c, i) => (
                <div key={i} className="w-full md:w-1/3 px-6">
                  <div className="bg-[#f9f7f4] p-6 rounded shadow luxury-card">
                    <p className="italic text-[#6b5b4f]">"{c.text}"</p>
                    <p className="mt-4 font-semibold text-[#b99d62]">
                      {c.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre histoire */}
        <section className="py-20 luxury-story">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 luxury-title">
              Notre histoire
            </h2>
            <p className="max-w-2xl mx-auto text-[#6b5b4f]">
              Karma Jewelry est une marque tunisienne qui célèbre la beauté,
              l'élégance et la force des femmes à travers des créations
              intemporelles en acier inoxydable doré.
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 luxury-newsletter">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 luxury-title">
              Restez informée
            </h2>
            <p className="text-[#6b5b4f] mb-6">
              Inscrivez-vous à notre newsletter et recevez -10% sur votre
              première commande.
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-4 py-3 rounded border border-[#d4c49a] w-72"
              />
              <button className="luxury-btn px-6 py-3 rounded font-bold uppercase text-sm">
                S’inscrire
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
