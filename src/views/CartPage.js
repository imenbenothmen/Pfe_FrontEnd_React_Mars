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

  // Mettre à jour la quantité d'un produit dans le panier
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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .luxury-container {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #fefefe 0%, #f8f6f3 50%, #f5f2ef 100%);
          min-height: 100vh;
          color: #2c2826;
        }

        .hero-section {
          padding: 120px 0 80px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f9f7f4 100%);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #e8e3dd;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse, rgba(185, 157, 98, 0.08) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, #b99d62, #d4c49a, #8b7355);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(139, 115, 85, 0.1);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #6b5b4f;
          margin-bottom: 2rem;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .main-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #ffffff 0%, #f8f6f3 100%);
        }

        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .empty-cart {
          text-align: center;
          padding: 80px 40px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          border: 1px solid #f0ece6;
        }

        .empty-cart-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: #8b7355;
          font-style: italic;
          margin-bottom: 20px;
        }

        .empty-cart-icon {
          font-size: 4rem;
          color: rgba(139, 115, 85, 0.3);
          margin-bottom: 20px;
        }

        .cart-item {
          background: #ffffff;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 20px;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          border: 1px solid #f0ece6;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .cart-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(185, 157, 98, 0.2);
          border-color: #d4c49a;
        }

        .product-image-container {
          position: relative;
          border: 2px solid #d4c49a;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f6f3, #f0ece6);
        }

        .product-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          display: block;
        }

        .product-info {
          flex: 1;
          min-width: 0;
        }

        .product-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #5a4a3a;
          margin-bottom: 8px;
          word-wrap: break-word;
        }

        .product-price {
          font-size: 1.3rem;
          font-weight: 600;
          color: #8b7355;
          font-family: 'Inter', sans-serif;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 0 20px;
        }

        .quantity-btn {
          width: 40px;
          height: 40px;
          border: 2px solid #d4c49a;
          background: #ffffff;
          color: #8b7355;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .quantity-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #d4c49a, #e8dcc6);
          color: #5a4a3a;
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(212, 196, 154, 0.3);
        }

        .quantity-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f5f2ef;
          color: #a19388;
          border-color: #e8e3dd;
        }

        .quantity-display {
          font-size: 1.2rem;
          font-weight: 600;
          color: #5a4a3a;
          min-width: 40px;
          text-align: center;
          background: #f9f7f4;
          padding: 8px 12px;
          border-radius: 20px;
          border: 1px solid #e8e3dd;
        }

        .remove-btn {
          background: transparent;
          border: 2px solid #d4c49a;
          color: #8b7355;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-btn:hover {
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          border-color: #e74c3c;
          color: white;
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        }

        .remove-icon {
          width: 24px;
          height: 24px;
        }

        .cart-summary {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          margin-top: 40px;
          box-shadow: 0 12px 40px rgba(139, 115, 85, 0.15);
          border: 2px solid #d4c49a;
          text-align: center;
        }

        .total-price {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #8b7355;
          margin-bottom: 30px;
          text-shadow: 0 1px 2px rgba(139, 115, 85, 0.1);
        }

        .checkout-btn {
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 30px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 6px 20px rgba(185, 157, 98, 0.3);
        }

        .checkout-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .checkout-btn:hover::before {
          left: 100%;
        }

        .checkout-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(185, 157, 98, 0.4);
          background: linear-gradient(45deg, #a08854, #c9b086);
        }

        .order-form {
          background: #ffffff;
          border-radius: 20px;
          padding: 50px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(139, 115, 85, 0.2);
          border: 2px solid #d4c49a;
          position: relative;
          overflow: hidden;
        }

        .order-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #b99d62, #d4c49a, #b99d62);
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: #5a4a3a;
          text-shadow: 0 1px 2px rgba(139, 115, 85, 0.1);
        }

        .form-group {
          margin-bottom: 30px;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #5a4a3a;
          font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #d4c49a;
          border-radius: 12px;
          font-size: 1rem;
          background: #f9f7f4;
          color: #2c2826;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .form-input:focus {
          outline: none;
          border-color: #b99d62;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(185, 157, 98, 0.1);
          transform: translateY(-1px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 40px;
        }

        .cancel-btn {
          background: transparent;
          color: #8b7355;
          border: 2px solid #d4c49a;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .cancel-btn:hover {
          background: #f9f7f4;
          color: #5a4a3a;
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(139, 115, 85, 0.15);
        }

        .confirm-btn {
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 6px 20px rgba(185, 157, 98, 0.3);
        }

        .confirm-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .confirm-btn:hover::before {
          left: 100%;
        }

        .confirm-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(185, 157, 98, 0.4);
          background: linear-gradient(45deg, #a08854, #c9b086);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .cart-item {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .product-info {
            text-align: center;
          }
          
          .quantity-controls {
            margin: 20px 0;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .order-form {
            margin: 0 20px;
            padding: 30px;
          }
        }
      `}</style>

      <div className="luxury-container">
        <IndexNavbar />
        
        <main>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Mon Panier</h1>
              <p className="hero-subtitle">Vos sélections prestigieuses vous attendent</p>
            </div>
          </section>

          {/* Main Content */}
          <section className="main-section">
            <div className="cart-container">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon">🛍️</div>
                  <p className="empty-cart-text">Votre panier est vide</p>
                  <p style={{color: '#6b5b4f', fontStyle: 'italic'}}>Découvrez notre collection prestigieuse</p>
                </div>
              ) : showForm ? (
                // FORMULAIRE DE COMMANDE
                <div className="order-form">
                  <h3 className="form-title">Informations de livraison</h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Numéro de téléphone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                      placeholder="Votre numéro de téléphone"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="deliveryAddress">
                      Adresse de livraison *
                    </label>
                    <textarea
                      id="deliveryAddress"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="form-input form-textarea"
                      placeholder="Votre adresse de livraison complète"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={handleCancel}
                      className="cancel-btn"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleConfirmOrder}
                      className="confirm-btn"
                    >
                      Confirmer la commande
                    </button>
                  </div>
                </div>
              ) : (
                // AFFICHAGE DU PANIER
                <div>
                  <div>
                    {cart.map((product, index) => (
                      <div key={index} className="cart-item">
                        {/* Image du produit */}
                        <div className="product-image-container">
                          <img
                            src={`http://localhost:5000/files/${product.image}`}
                            alt={product.name}
                            className="product-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: rgba(139, 115, 85, 0.3);">💎</div>';
                            }}
                          />
                        </div>

                        {/* Informations du produit */}
                        <div className="product-info">
                          <h4 className="product-name">{product.name}</h4>
                          <div className="product-price">{product.price} TND</div>
                        </div>

                        {/* Contrôles de quantité */}
                        <div className="quantity-controls">
                          <button
                            onClick={() => updateQuantity(index, product.quantity - 1)}
                            className="quantity-btn"
                            disabled={product.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="quantity-display">{product.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, product.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>

                        {/* Bouton supprimer */}
                        <button
                          onClick={() => removeFromCart(index)}
                          className="remove-btn"
                          title="Supprimer du panier"
                        >
                          <svg className="remove-icon" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6M10 11v6M14 11v6" 
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Résumé du panier */}
                  <div className="cart-summary">
                    <div className="total-price">
                      Total: {getTotalPrice()} TND
                    </div>
                    <button
                      onClick={handleCheckoutClick}
                      className="checkout-btn"
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