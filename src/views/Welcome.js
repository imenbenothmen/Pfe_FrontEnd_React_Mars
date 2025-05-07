/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";

export default function Welcome() {
  return (
    <>
      <IndexNavbar fixed />

      {/* Hero Section */}
      <section className="relative bg-pink-100 pt-32 pb-20 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600185365226-c3e1f0f6a57f')" }}></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Révélez votre éclat ✨</h1>
          <p className="text-lg text-gray-700 mb-6">Des bijoux qui racontent votre histoire – Élégance, féminité et force.</p>
          <Link to="/shop" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-sm font-bold uppercase">
            Découvrir la collection
          </Link>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Nos bijoux en vedette</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[{
              name: "Collier Élégance",
              price: "89 DT",
              img: "https://via.placeholder.com/300x300?text=Collier"
            }, {
              name: "Bracelet Doré",
              price: "69 DT",
              img: "https://via.placeholder.com/300x300?text=Bracelet"
            }, {
              name: "Boucles Perles",
              price: "99 DT",
              img: "https://via.placeholder.com/300x300?text=Boucles"
            }].map((p, i) => (
              <div key={i} className="w-full md:w-1/4 text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <img src={p.img} alt={p.name} className="rounded mb-4" />
                <h5 className="text-xl font-semibold text-gray-800">{p.name}</h5>
                <p className="text-yellow-600 font-bold mt-2">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">Nos catégories</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["Colliers", "Bracelets", "Boucles", "Bagues", "Montres"].map((cat, i) => (
              <div key={i} className="bg-white w-40 py-6 px-4 rounded shadow hover:shadow-lg">
                <p className="text-lg font-medium text-gray-700">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offre spéciale */}
      <section className="py-16 bg-yellow-100 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Offre spéciale 💝</h2>
        <p className="text-lg text-gray-700">Livraison offerte dès 99 DT - Profitez-en maintenant !</p>
        <Link to="/shop" className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-full font-bold uppercase text-sm">
          Voir les bijoux
        </Link>
      </section>

      {/* Avis clients */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">Ce que disent nos clientes</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[{
              name: "Sonia",
              text: "Magnifiques bijoux, je recommande à 100% !"
            }, {
              name: "Leïla",
              text: "Service rapide et qualité top !"
            }, {
              name: "Inès",
              text: "Mon collier préféré, il ne bouge pas 🥰"
            }].map((c, i) => (
              <div key={i} className="w-full md:w-1/3 px-6">
                <div className="bg-pink-100 p-6 rounded shadow">
                  <p className="italic">"{c.text}"</p>
                  <p className="mt-4 font-semibold text-yellow-600">{c.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Notre histoire</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Karma Jewelry est une marque tunisienne qui célèbre la beauté, l'élégance et la force des femmes à travers des créations intemporelles en acier inoxydable doré.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Restez informée</h2>
          <p className="text-gray-600 mb-6">Inscrivez-vous à notre newsletter et recevez -10% sur votre première commande.</p>
          <form className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="px-4 py-3 rounded border border-gray-300 w-72"
            />
            <button className="bg-yellow-500 text-white px-6 py-3 rounded font-bold uppercase text-sm hover:bg-yellow-600">
              S’inscrire
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
