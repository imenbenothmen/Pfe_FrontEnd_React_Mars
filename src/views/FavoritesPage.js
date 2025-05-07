import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// 🔥 Réutilise la même navbar/footer que Landing
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gérer les erreurs
  const history = useHistory();

  // Récupérer l'ID de l'utilisateur depuis le localStorage ou un contexte global
  const userId = localStorage.getItem("userId"); // Assure-toi que l'utilisateur est bien connecté et que l'ID est dans le localStorage

  useEffect(() => {
    if (!userId) {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      history.push("/auth");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/favorites/getFavoritesByUser/${userId}`);
        setFavorites(res.data);
      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement des favoris.");
      } finally {
        setLoading(false); // Arrêter le chargement une fois l'appel terminé
      }
    };

    fetchFavorites();
  }, [userId, history]);

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/remove/${productId}`);
      setFavorites(favorites.filter((fav) => fav._id !== productId)); // Supprimer le produit des favoris dans l'état local
      alert("Produit retiré des favoris !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors du retrait des favoris.");
    }
  };

  if (loading) {
    return <div>Chargement des favoris...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <IndexNavbar />
      <main className="mt-20">
        <section className="py-16 bg-blueGray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <h2 className="text-3xl font-semibold">Mes favoris</h2>
              {favorites.length === 0 ? (
                <p>Aucun produit dans vos favoris.</p>
              ) : (
                <div className="w-full md:w-6/12 lg:w-4/12 px-4 text-center">
                  {favorites.map((product) => (
                    <div key={product._id} className="mb-4">
                      <img
                        alt={product.name}
                        className="shadow-lg rounded max-w-full mx-auto"
                        src={`http://localhost:5000/files/${product.image}`}
                      />
                      <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                      <button
                        onClick={() => handleRemoveFromFavorites(product._id)}
                        className="mt-4 bg-red-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-600"
                      >
                        Retirer des favoris
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
