import React, { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const addToCart = () => {
    const newProduct = { name: "Bijou Example", price: 50, image: "example.jpg" };
    setCart([...cart, newProduct]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <>
      <IndexNavbar />
      {/* min-h-screen pour prendre toute la hauteur, flex-col pour empiler, justify-between pour pousser le footer en bas */}
      <div className="flex flex-col min-h-screen">
        {/* Contenu principal (prend l’espace restant) */}
        <main className="flex-grow">
          <section className="py-16 bg-blueGray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-semibold text-center text-blueGray-700 mb-8">Mon Panier</h2>
              {cart.length === 0 ? (
                <p className="text-center text-lg text-blueGray-600">Votre panier est vide.</p>
              ) : (
                <div className="space-y-6">
                  <ul className="space-y-4">
                    {cart.map((product, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={`http://localhost:5000/files/${product.image}`}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-blueGray-700">{product.name}</h3>
                            <p className="text-sm text-blueGray-500">Prix: {product.price} TND</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-200"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-blueGray-700">
                      Total: {getTotalPrice()} TND
                    </h3>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-all duration-200">
                      Passer à la caisse
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-blueGray-800 py-4">
            <div className="container mx-auto text-center">
              <button
                onClick={addToCart}
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-all duration-200"
              >
                Ajouter un produit au panier
              </button>
            </div>
          </section>
        </main>

        {/* Footer reste toujours en bas même si peu de contenu */}
        <Footer />
      </div>
    </>
  );
}
