import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

// 🔥 Réutilise la même navbar/footer que Landing
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function ProductDetails() {
  const { id } = useParams(); // 👈 récupérer l'ID du produit à partir de l'URL
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]); // 🚀 gérer le panier dans ce composant
  const [isFavorite, setIsFavorite] = useState(false); // 🚀 État pour savoir si le produit est favori
  const history = useHistory();

  useEffect(() => {
    // 🔎 Appel API pour récupérer les détails du produit par ID
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/getProductDetails/${id}`);
        console.log("Détails du produit:", res.data);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    // Ajouter le produit au panier
    setCart([...cart, product]);
    alert("Produit ajouté au panier !");
    history.push('/panier'); // Rediriger vers la page du panier
  };

  const toggleFavorite = async () => {
    try {
      // Appel à l'API pour ajouter ou retirer du favoris
      const method = isFavorite ? "delete" : "post";
      const res = await axios({
        method,
        url: `http://localhost:5000/favorites/${isFavorite ? 'remove' : 'add'}`, // Assure-toi que l'URL de l'API correspond
        data: {
          productId: product._id, // Envoyer l'ID du produit
        },
      });
      console.log(res.data);
      setIsFavorite(!isFavorite); // Toggle favori
      alert(isFavorite ? "Produit retiré des favoris." : "Produit ajouté aux favoris.");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout au favoris.");
    }
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
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  {product.description}
                </p>
                <p className="mt-4 text-xl font-bold text-blueGray-700">
                  Price: {product.price} TND
                </p>
                <p className="mt-2 text-md text-blueGray-600">
                  Stock: {product.stock}
                </p>
                {product.material && (
                  <p className="mt-2 text-md text-blueGray-600">
                    material: {product.material}
                  </p>
                )}
                {product.type && (
                  <p className="mt-2 text-md text-blueGray-600">
                    Type: {product.type}
                  </p>
                )}

                {/* Affichage des avis */}
                <div className="mt-8 text-left">
                  <h4 className="text-xl font-semibold mb-4">review :</h4>
                  {product.reviews && product.reviews.length > 0 ? (
                    <ul>
                      {product.reviews.map((review, index) => (
                        <li key={index} className="mt-2 border-b pb-2">
                          <p>
                            <strong>{review.user?.name || "User"}</strong> : {review.comment}
                          </p>
                          <p>Rating: {review.rating}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews for this product.</p>
                  )}
                </div>

                {/* Boutons Ajouter au panier et Ajouter aux favoris */}
                <button 
                  onClick={addToCart} 
                  className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600">
                  Ajouter au panier
                </button>
                
                <button 
                  onClick={toggleFavorite} 
                  className={`mt-4 ml-4 ${isFavorite ? 'bg-red-500' : 'bg-gray-500'} text-white px-6 py-3 rounded-full shadow-md hover:bg-${isFavorite ? 'red' : 'gray'}-600`}>
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
