import React, { useEffect, useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { addOrder } from "../services/Apiorder";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Charger le panier depuis localStorage au chargement du composant
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calcul du prix total du panier
  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Supprimer un produit du panier
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  // Mettre à jour la quantité d’un produit dans le panier
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return; // On n'autorise pas quantité <= 0
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  // Afficher le formulaire de commande
  const handleCheckoutClick = () => {
    setShowForm(true);
  };

  // Annuler la commande (masquer le formulaire et vider les champs)
  const handleCancel = () => {
    setShowForm(false);
    setPhone("");
    setDeliveryAddress("");
  };

  // Confirmer et envoyer la commande
  const handleConfirmOrder = async () => {
    if (!phone.trim() || !deliveryAddress.trim()) {
      alert("Veuillez remplir le téléphone et l'adresse de livraison.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    const orderData = {
      client: user._id,
      phone,
      deliveryAddress,
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
      setShowForm(false);
      setPhone("");
      setDeliveryAddress("");
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
              ) : showForm ? (
                // FORMULAIRE DE COMMANDE
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6 text-blueGray-700 text-center">Informations de livraison</h3>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium text-blueGray-700" htmlFor="phone">
                      Numéro de téléphone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre numéro de téléphone"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-1 font-medium text-blueGray-700" htmlFor="deliveryAddress">
                      Adresse de livraison *
                    </label>
                    <textarea
                      id="deliveryAddress"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre adresse de livraison"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleConfirmOrder}
                      className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                    >
                      Confirmer la commande
                    </button>
                  </div>
                </div>
              ) : (
                // AFFICHAGE DU PANIER
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
                              <label className="mr-2 text-sm text-blueGray-600" htmlFor={`quantity-${index}`}>
                                Quantité:
                              </label>
                              <input
                                id={`quantity-${index}`}
                                type="number"
                                min="1"
                                value={product.quantity}
                                onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
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
                      onClick={handleCheckoutClick}
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
