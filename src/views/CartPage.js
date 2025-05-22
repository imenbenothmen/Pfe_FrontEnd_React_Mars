import React, { useEffect, useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { addOrder } from "../services/Apiorder"; // 🔁 importe la fonction

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    if (newQuantity <= 0) return;
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // 🔍 récupérer l'utilisateur connecté
    if (!user || !user._id) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    const orderData = {
      client: user._id,
      products: cart.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        price: p.price,
      })),
      total: getTotalPrice(),
    };

    try {
      await addOrder(orderData);
      alert("Commande envoyée avec succès !");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Erreur lors du passage de la commande :", error);
      alert("Erreur lors de l'envoi de la commande.");
    }
  };

  return (
    <>
      <IndexNavbar />
      <div className="flex flex-col min-h-screen">
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
                            <div className="flex items-center mt-2">
                              <label className="mr-2 text-sm text-blueGray-600">Quantité:</label>
                              <input
                                type="number"
                                min="1"
                                value={product.quantity}
                                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                className="w-16 px-2 py-1 border rounded"
                              />
                            </div>
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
                    <button
                      onClick={handleCheckout}
                      className="bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-all duration-200"
                    >
                      Passer Commande
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
