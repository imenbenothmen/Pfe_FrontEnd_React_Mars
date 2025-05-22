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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
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

        .categories-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f9f7f4 0%, #ffffff 100%);
          border-bottom: 1px solid #e8e3dd;
        }

        .categories-title {
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 600;
          color: #8b7355;
          margin-bottom: 50px;
          text-shadow: 0 1px 2px rgba(139, 115, 85, 0.1);
        }

        .categories-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .category-btn {
          padding: 15px 30px;
          border: 2px solid #d4c49a;
          background: #ffffff;
          color: #8b7355;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 180px;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
        }

        .category-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 196, 154, 0.15), transparent);
          transition: left 0.5s ease;
        }

        .category-btn:hover::before {
          left: 100%;
        }

        .category-btn:hover,
        .category-btn.active {
          background: linear-gradient(45deg, #d4c49a, #e8dcc6);
          color: #5a4a3a;
          box-shadow: 0 6px 20px rgba(212, 196, 154, 0.25);
          transform: translateY(-2px);
          border-color: #b99d62;
        }

        .products-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #ffffff 0%, #f8f6f3 100%);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .product-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          transition: all 0.3s ease;
          position: relative;
          border: 1px solid #f0ece6;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(185, 157, 98, 0.2);
          border-color: #d4c49a;
        }

        .product-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          background: linear-gradient(135deg, #f8f6f3, #f0ece6);
        }

        .product-content {
          padding: 30px;
        }

        .product-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #5a4a3a;
        }

        .product-description {
          color: #6b5b4f;
          margin-bottom: 20px;
          font-style: italic;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #8b7355;
          margin-bottom: 20px;
          font-family: 'Inter', sans-serif;
        }

        .product-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 15px rgba(185, 157, 98, 0.3);
        }

        .product-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .product-btn:hover::before {
          left: 100%;
        }

        .product-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(185, 157, 98, 0.4);
          background: linear-gradient(45deg, #a08854, #c9b086);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 60px;
        }

        .pagination-btn {
          padding: 12px 24px;
          background: #ffffff;
          color: #8b7355;
          border: 2px solid #d4c49a;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
        }

        .pagination-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #d4c49a, #e8dcc6);
          color: #5a4a3a;
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(212, 196, 154, 0.25);
        }

        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f5f2ef;
          color: #a19388;
          border-color: #e8e3dd;
          box-shadow: none;
        }

        .pagination-info {
          color: #6b5b4f;
          font-weight: 500;
          font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
          background: #f9f7f4;
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #e8e3dd;
        }

        .no-products {
          text-align: center;
          width: 100%;
          padding: 60px 20px;
          color: #8b7355;
          font-size: 1.2rem;
          font-style: italic;
          font-family: 'Playfair Display', serif;
          background: #f9f7f4;
          border-radius: 16px;
          border: 1px solid #e8e3dd;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
          
          .categories-title {
            font-size: 2rem;
          }
          
          .products-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .categories-grid {
            flex-direction: column;
            align-items: center;
          }
          
          .category-btn {
            min-width: 200px;
          }
          
          .pagination {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>

      <div className="luxury-container">
        <Navbar transparent />
        
        <main>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Collection Prestigieuse</h1>
              <p className="hero-subtitle">Découvrez l'élégance intemporelle de nos créations uniques</p>
            </div>
          </section>

          {/* Categories Section */}
          <section className="categories-section">
            <div className="container mx-auto px-4">
              <h2 className="categories-title">Nos Collections</h2>
              <div className="categories-grid">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentPage(1);
                  }}
                  className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
                >
                  Tous les articles
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat._id);
                      setCurrentPage(1);
                    }}
                    className={`category-btn ${selectedCategory === cat._id ? 'active' : ''}`}
                  >
                    {cat.nom}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section className="products-section">
            <div className="container mx-auto px-4">
              <div className="products-grid">
                {paginatedProducts.length === 0 ? (
                  <div className="no-products">
                    Aucun produit trouvé pour cette catégorie.
                  </div>
                ) : (
                  paginatedProducts.map((product) => (
                    <div key={product._id} className="product-card">
                      <img
                        src={`http://localhost:5000/files/${product.image}`}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #f8f6f3, #f0ece6)';
                          e.target.style.display = 'flex';
                          e.target.style.alignItems = 'center';
                          e.target.Style.justifyContent = 'center';
                          e.target.innerHTML = '💎';
                          e.target.style.fontSize = '4rem';
                          e.target.style.color = 'rgba(139, 115, 85, 0.3)';
                        }}
                      />
                      <div className="product-content">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-description">
                          {product.description && product.description.length > 100
                            ? product.description.slice(0, 100) + "..."
                            : product.description || "Description non disponible"}
                        </p>
                        <div className="product-price">
                          {product.price} TND
                        </div>
                        <Link
                          to={`/product/${product._id}`}
                          className="product-btn"
                        >
                          Voir les détails
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {paginatedProducts.length > 0 && (
                <div className="pagination">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Précédent
                  </button>

                  <span className="pagination-info">
                    Page {currentPage} / {totalPages || 1}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages}
                    className="pagination-btn"
                  >
                    Suivant →
                  </button>
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