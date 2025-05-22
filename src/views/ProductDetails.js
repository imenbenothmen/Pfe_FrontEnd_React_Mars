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
  const [rating, setRating] = useState(0); // 👈 étoiles grises au départ
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
      setRating(0); // reset à vide
      const resReviews = await axios.get(`http://localhost:5000/reviews/getReviews/${id}`);
      setReviews(resReviews.data);
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de l'avis.");
    }
  };

  // ⭐️ Pour le formulaire interactif
  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-3xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  // ⭐️ Pour afficher les avis avec étoiles
  const ReviewStars = ({ rating }) => {
    return (
      <div className="flex space-x-1 mt-1 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <IndexNavbar />
      <main className="mt-20">
        <section className="py-16 bg-blueGray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-6/12 lg:w-4/12 px-4 text-center">
                <img
                  alt={product.name}
                  className="shadow-lg rounded max-w-full mx-auto"
                  src={`http://localhost:5000/files/${product.image}`}
                />
                <h3 className="text-3xl font-semibold mt-6">{product.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">{product.description}</p>
                <p className="mt-4 text-xl font-bold text-blueGray-700">Prix : {product.price} TND</p>
                <p className="mt-2 text-md text-blueGray-600">Stock : {product.stock}</p>
                {product.material && <p className="mt-2 text-md text-blueGray-600">Matériau : {product.material}</p>}
                {product.type && <p className="mt-2 text-md text-blueGray-600">Type : {product.type}</p>}

                {/* Avis existants */}
                <div className="mt-8 text-left">
                  <h4 className="text-xl font-semibold mb-4">Avis :</h4>
                  {reviews.length > 0 ? (
                    <ul>
                      {reviews.map((review, index) => (
                        <li key={index} className="mt-2 border-b pb-2">
                          <p><strong>{review.user?.username || "Utilisateur"}</strong> :</p>
                          <ReviewStars rating={review.rating} />
                          <p>{review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun avis pour ce produit.</p>
                  )}
                </div>

                {/* Formulaire d'ajout d'avis */}
                {currentUser ? (
                  <form onSubmit={handleReviewSubmit} className="mt-6 text-left">
                    <h5 className="text-lg font-semibold mb-2">Laisser un avis :</h5>
                    <label className="block mb-2">Note :</label>
                    <StarRating rating={rating} setRating={setRating} />
                    <label className="block mb-2">Commentaire :</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border rounded mb-4"
                      rows="3"
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Envoyer l'avis
                    </button>
                  </form>
                ) : (
                  <p className="mt-4 text-red-500 font-semibold">Veuillez vous connecter pour laisser un avis.</p>
                )}

                {/* Boutons panier et favoris */}
                <button
                  onClick={addToCart}
                  className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600"
                >
                  Ajouter au panier
                </button>

                <button
                  onClick={toggleFavorite}
                  className={`mt-4 ml-4 ${isFavorite ? 'bg-red-500' : 'bg-gray-500'} text-white px-6 py-3 rounded-full shadow-md`}
                >
                  {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
