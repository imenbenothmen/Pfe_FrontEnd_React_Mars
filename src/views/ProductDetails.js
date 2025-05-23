import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { add_to_favorites, remove_from_favorites } from "services/Apifavorites";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const history = useHistory();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduct = await axios.get(`http://localhost:5000/products/getProductDetails/${id}`);
        setProduct(resProduct.data);

        const resReviews = await axios.get(`http://localhost:5000/reviews/getReviews/${id}`);
        setReviews(resReviews.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const addToCart = () => {
    if (!currentUser) {
      alert("Veuillez vous connecter pour ajouter des produits au panier.");
      history.push("/auth/login");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex(item => item._id === product._id);

    if (productIndex !== -1) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Produit ajouté au panier !");
    history.push("/carts");
  };

  const toggleFavorite = async () => {
    try {
      const clientId = currentUser?._id;
      const data = {
        clientId,
        productId: product._id,
      };

      if (isFavorite) {
        await remove_from_favorites(data);
        setIsFavorite(false);
        alert("Produit retiré des favoris.");
      } else {
        await add_to_favorites(data);
        setIsFavorite(true);
        alert("Produit ajouté aux favoris.");
      }
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la gestion des favoris.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/reviews/addReview`,
        { productId: product._id, rating, comment },
        { withCredentials: true }
      );
      setComment("");
      setRating(0);
      const resReviews = await axios.get(`http://localhost:5000/reviews/getReviews/${id}`);
      setReviews(resReviews.data);
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de l'avis.");
    }
  };

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-3xl transition-colors duration-200 ${
              star <= rating ? "text-golden" : "text-neutral hover:text-golden-light"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= rating ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={star <= rating ? 0 : 2}
                d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.914-1.004L12 2.5l3.086 6.251L22 9.755l-5.007 4.367 1.179 6.873z"
              />
            </svg>
          </span>
        ))}
      </div>
    );
  };

  const ReviewStars = ({ rating }) => {
    return (
      <div className="flex space-x-1 mt-1 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-golden" : "text-neutral"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= rating ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={star <= rating ? 0 : 2}
                d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.914-1.004L12 2.5l3.086 6.251L22 9.755l-5.007 4.367 1.179 6.873z"
              />
            </svg>
          </span>
        ))}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-golden border-t-transparent mx-auto mb-4"></div>
          <p className="text-brown-dark text-xl font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

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

        .product-section {
          padding: 100px 0 80px;
          background: linear-gradient(135deg, #ffffff 0%, #f9f7f4 100%);
          min-height: 100vh;
        }

        .product-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(139, 115, 85, 0.15);
          transition: all 0.3s ease;
          border: 1px solid #f0ece6;
          max-width: 600px;
          margin: 0 auto;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 80px rgba(185, 157, 98, 0.25);
          border-color: #d4c49a;
        }

        .product-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          background: linear-gradient(135deg, #f8f6f3, #f0ece6);
        }

        .product-content {
          padding: 40px;
        }

        .product-title {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          color: #8b7355;
          text-align: center;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .product-description {
          font-size: 1.1rem;
          color: #6b5b4f;
          text-align: center;
          margin-bottom: 30px;
          line-height: 1.7;
          font-style: italic;
        }

        .product-info {
          background: #f9f7f4;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          border: 1px solid #e8e3dd;
        }

        .product-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: #8b7355;
          text-align: center;
          margin-bottom: 20px;
          font-family: 'Inter', sans-serif;
        }

        .product-details {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .detail-item {
          background: #ffffff;
          padding: 12px 20px;
          border-radius: 25px;
          border: 1px solid #d4c49a;
          color: #6b5b4f;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 40px;
        }

        .btn-primary {
          flex: 1;
          min-width: 200px;
          padding: 18px 30px;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 6px 20px rgba(185, 157, 98, 0.3);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(185, 157, 98, 0.4);
          background: linear-gradient(45deg, #a08854, #c9b086);
        }

        .btn-secondary {
          flex: 1;
          min-width: 200px;
          padding: 18px 30px;
          background: #ffffff;
          color: #8b7355;
          border: 2px solid #d4c49a;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 15px rgba(139, 115, 85, 0.1);
        }

        .btn-secondary:hover {
          background: linear-gradient(45deg, #d4c49a, #e8dcc6);
          color: #5a4a3a;
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(212, 196, 154, 0.25);
        }

        .btn-secondary.active {
          background: linear-gradient(45deg, #8b7355, #6b5b4f);
          color: white;
          border-color: #8b7355;
        }

        .reviews-section {
          background: #f9f7f4;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          border: 1px solid #e8e3dd;
        }

        .reviews-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #8b7355;
          margin-bottom: 20px;
          text-align: center;
        }

        .review-item {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 15px;
          border: 1px solid #e8e3dd;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.05);
        }

        .review-author {
          font-weight: 600;
          color: #5a4a3a;
          margin-bottom: 8px;
        }

        .review-comment {
          color: #6b5b4f;
          line-height: 1.6;
          margin-top: 8px;
        }

        .review-form {
          background: #ffffff;
          border-radius: 16px;
          padding: 30px;
          border: 1px solid #e8e3dd;
          box-shadow: 0 4px 15px rgba(139, 115, 85, 0.08);
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #8b7355;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #5a4a3a;
          font-weight: 500;
        }

        .form-textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid #e8e3dd;
          border-radius: 12px;
          font-size: 14px;
          color: #2c2826;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.3s ease;
          resize: vertical;
          min-height: 100px;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #d4c49a;
          box-shadow: 0 0 0 3px rgba(212, 196, 154, 0.1);
        }

        .no-reviews {
          text-align: center;
          color: #8b7355;
          font-style: italic;
          padding: 40px 0;
          font-size: 1.1rem;
        }

        .login-message {
          text-align: center;
          color: #8b7355;
          font-weight: 600;
          padding: 30px;
          background: #f9f7f4;
          border-radius: 12px;
          border: 1px solid #e8e3dd;
        }

        .text-golden {
          color: #b99d62;
        }

        .text-golden-light {
          color: #d4c49a;
        }

        .text-neutral {
          color: #a19388;
        }

        .text-brown-dark {
          color: #2c2826;
        }

        .bg-cream {
          background: #f9f7f4;
        }

        @media (max-width: 768px) {
          .product-title {
            font-size: 2.2rem;
          }
          
          .product-content {
            padding: 30px 20px;
          }
          
          .product-price {
            font-size: 2rem;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn-primary,
          .btn-secondary {
            min-width: 100%;
          }
          
          .product-details {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="luxury-container">
        <IndexNavbar />
        <main className="mt-20">
          <section className="product-section">
            <div className="container mx-auto px-4">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <div className="product-card">
                    <img
                      alt={product.name}
                      className="product-image"
                      src={`http://localhost:5000/files/${product.image}`}
                      onError={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #f8f6f3, #f0ece6)';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.innerHTML = '💎';
                        e.target.style.fontSize = '6rem';
                        e.target.style.color = 'rgba(139, 115, 85, 0.3)';
                      }}
                    />
                    
                    <div className="product-content">
                      <h1 className="product-title">{product.name}</h1>
                      
                      <p className="product-description">{product.description}</p>
                      
                      <div className="product-info">
                        <div className="product-price">{product.price} TND</div>
                        
                        <div className="product-details">
                          <div className="detail-item">Stock : {product.stock}</div>
                          {product.material && (
                            <div className="detail-item">Matériau : {product.material}</div>
                          )}
                          {product.type && (
                            <div className="detail-item">Type : {product.type}</div>
                          )}
                        </div>
                      </div>

                      <div className="action-buttons">
                        <button onClick={addToCart} className="btn-primary">
                          Ajouter au panier
                        </button>
                        <button
                          onClick={toggleFavorite}
                          className={`btn-secondary ${isFavorite ? 'active' : ''}`}
                        >
                          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                        </button>
                      </div>

                      <div className="reviews-section">
                        <h2 className="reviews-title">Avis clients</h2>
                        {reviews.length > 0 ? (
                          <div>
                            {reviews.map((review, index) => (
                              <div key={index} className="review-item">
                                <div className="review-author">
                                  {review.user?.username || "Utilisateur anonyme"}
                                </div>
                                <ReviewStars rating={review.rating} />
                                <p className="review-comment">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="no-reviews">
                            Aucun avis pour ce produit. Soyez le premier à donner votre opinion !
                          </div>
                        )}
                      </div>

                      <div className="review-form">
                        {currentUser ? (
                          <form onSubmit={handleReviewSubmit}>
                            <h3 className="form-title">Donner votre avis</h3>
                            <label className="form-label">Votre note :</label>
                            <StarRating rating={rating} setRating={setRating} />
                            <label className="form-label">Votre commentaire :</label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="form-textarea"
                              placeholder="Partagez votre expérience avec ce produit..."
                              required
                            ></textarea>
                            <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '20px'}}>
                              Publier mon avis
                            </button>
                          </form>
                        ) : (
                          <div className="login-message">
                            Veuillez vous connecter pour laisser un avis sur ce produit.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}