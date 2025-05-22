import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/Apiproduct";
import { getCategories } from "../services/Apicategory";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories", err);
    }
  };

  useEffect(() => {
    getProducts();
    getAllCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (!selectedCategory) return true;
    const categoryId = p.category?._id || p.category;
    return categoryId === selectedCategory;
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const paginatedProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Welcome to Karma Jewelry
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Découvrez notre collection unique et trouvez la pièce parfaite qui vous correspond.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Catégories filtres */}
        <section className="bg-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full border text-sm font-medium hover:bg-blue-100 transition ${
                  selectedCategory === null ? 'bg-blue-500 text-white' : 'text-blue-700 border-blue-300'
                }`}
              >
                 tous les articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium hover:bg-blue-100 transition ${
                    selectedCategory === cat._id ? 'bg-blue-500 text-white' : 'text-blue-700 border-blue-300'
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Produits */}
        <section className="pb-20 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {paginatedProducts.map((product, index) => (
                <div
                  key={index}
                  className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
                >
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <img
                      src={`http://localhost:5000/files/${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="px-4 py-5 flex-auto">
                      <h6 className="text-xl font-semibold">{product.name}</h6>
                      <p className="mt-2 mb-2 text-blueGray-500">
                        {product.description}
                      </p>
                      <p className="text-lg font-bold text-blueGray-700">
                        {product.price} TND
                      </p>
                      <Link
                        to={`/product/${product._id}`}
                        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Voir les détails
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-2 text-white bg-blue-500 rounded ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Précédent
              </button>
              <span className="px-4 py-2 text-lg">
                Page {currentPage} / {Math.ceil(filteredProducts.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
                className={`px-4 py-2 mx-2 text-white bg-blue-500 rounded ${
                  currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Suivant
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
