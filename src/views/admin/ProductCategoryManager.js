import React, { useEffect, useState } from "react";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../../services/Apiproduct";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../../services/Apicategory";

export default function ProductCategoryManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    material: "",
    type: "",
    image: null, // type File pour l’upload d’image
  });

  const [newCategory, setNewCategory] = useState({
    nom: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      for (const key in newProduct) {
        formData.append(key, newProduct[key]);
      }

      await addProduct(formData);
      fetchProducts();
      // Réinitialiser le formulaire après ajout
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        material: "",
        type: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      await updateProduct(id, newProduct);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory(newCategory);
      fetchCategories();
      setNewCategory({ nom: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (prod) => {
    setNewProduct({ ...prod });
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap");
        .luxury-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.12);
          border: 1.5px solid #f0ece6;
          padding: 40px 32px 32px 32px;
          max-width: 1100px;
          margin: 40px auto;
          position: relative;
        }
        .luxury-title {
          font-family: "Playfair Display", serif;
          font-size: 2rem;
          font-weight: 700;
          color: #5a4a3a;
          margin-bottom: 2rem;
          text-align: center;
        }
        .luxury-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-family: "Inter", sans-serif;
          background: #fff;
        }
        .luxury-table th,
        .luxury-table td {
          border-bottom: 1.5px solid #f0ece6;
          padding: 14px 12px;
          text-align: left;
        }
        .luxury-table th {
          background: #f9f7f4;
          color: #8b7355;
          font-weight: 600;
          font-size: 1.05rem;
        }
        .luxury-table tr:last-child td {
          border-bottom: none;
        }
        .luxury-btn {
          padding: 8px 18px;
          border-radius: 24px;
          border: none;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          font-size: 0.98rem;
          margin-right: 8px;
          margin-bottom: 4px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(185, 157, 98, 0.08);
        }
        .luxury-btn.green {
          background: linear-gradient(45deg, #b6d7a8, #6fcf97);
          color: #22543d;
        }
        .luxury-btn.green:hover {
          background: linear-gradient(45deg, #6fcf97, #b6d7a8);
        }
        .luxury-btn.yellow {
          background: linear-gradient(45deg, #ffe082, #ffd54f);
          color: #8b7355;
        }
        .luxury-btn.yellow:hover {
          background: linear-gradient(45deg, #ffd54f, #ffe082);
        }
        .luxury-btn.red {
          background: linear-gradient(45deg, #ff8a80, #ff5252);
          color: #fff;
        }
        .luxury-btn.red:hover {
          background: linear-gradient(45deg, #ff5252, #ff8a80);
        }
        .luxury-btn.blue {
          background: linear-gradient(45deg, #b99d62, #d4c49a);
          color: #fff;
        }
        .luxury-btn.blue:hover {
          background: linear-gradient(45deg, #d4c49a, #b99d62);
        }
        .luxury-input, .luxury-select {
          border: 1.5px solid #d4c49a;
          border-radius: 18px;
          padding: 10px 16px;
          font-size: 1rem;
          margin: 0 6px 10px 0;
          font-family: 'Inter', sans-serif;
          background: #f9f7f4;
          transition: border 0.2s;
        }
        .luxury-input:focus, .luxury-select:focus {
          border-color: #b99d62;
          outline: none;
          background: #fffbe9;
        }
        .luxury-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 12px;
          border: 1.5px solid #e8e3dd;
          background: #f9f7f4;
        }
        .luxury-category-list {
          list-style: disc;
          margin-left: 1.5rem;
        }
        .luxury-category-list li {
          margin-bottom: 8px;
        }
        @media (max-width: 900px) {
          .luxury-card {
            padding: 24px 4px 16px 4px;
          }
          .luxury-title {
            font-size: 1.2rem;
          }
          .luxury-table th,
          .luxury-table td {
            padding: 8px 4px;
            font-size: 0.95rem;
          }
        }
      `}</style>
      <div className="luxury-card">
        <h2 className="luxury-title">Gestion des Produits</h2>
        {/* Formulaire d'ajout/modification produit */}
        <div className="flex flex-wrap items-center mb-4">
          <input
            name="name"
            value={newProduct.name}
            placeholder="Nom"
            onChange={handleProductChange}
            className="luxury-input"
          />
          <input
            name="description"
            value={newProduct.description}
            placeholder="Description"
            onChange={handleProductChange}
            className="luxury-input"
          />
          <input
            name="price"
            type="number"
            value={newProduct.price}
            placeholder="Prix"
            onChange={handleProductChange}
            className="luxury-input"
          />
          <input
            name="stock"
            type="number"
            value={newProduct.stock}
            placeholder="Stock"
            onChange={handleProductChange}
            className="luxury-input"
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleProductChange}
            className="luxury-select"
          >
            <option value="">-- Catégorie --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nom}
              </option>
            ))}
          </select>
          <input
            name="material"
            value={newProduct.material}
            placeholder="Matériau"
            onChange={handleProductChange}
            className="luxury-input"
          />
          <input
            name="type"
            value={newProduct.type}
            placeholder="Type"
            onChange={handleProductChange}
            className="luxury-input"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="luxury-input"
            style={{ background: "#fff" }}
          />
          <button
            onClick={newProduct._id ? () => handleUpdateProduct(newProduct._id) : handleAddProduct}
            className="luxury-btn blue"
          >
            {newProduct._id ? "Mettre à jour le produit" : "Ajouter Produit"}
          </button>
        </div>
        {/* Table des produits */}
        <div className="overflow-x-auto">
          <table className="luxury-table mt-4">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Catégorie</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>{prod.price} DT</td>
                  <td>{prod.stock}</td>
                  <td>
                    {categories.find((c) => c._id === prod.category)?.nom || ""}
                  </td>
                  <td>
                    {prod.image && (
                      <img
                        src={`http://localhost:5000/files/${prod.image}`}
                        alt={prod.name}
                        className="luxury-img"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditProduct(prod)}
                      className="luxury-btn yellow"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod._id)}
                      className="luxury-btn red"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Gestion des catégories */}
        <h2 className="luxury-title" style={{ marginTop: "2.5rem" }}>Gestion des Catégories</h2>
        <div className="flex flex-wrap items-center mb-4">
          <input
            name="nom"
            value={newCategory.nom}
            placeholder="Nom catégorie"
            onChange={handleCategoryChange}
            className="luxury-input"
          />
          <input
            name="description"
            value={newCategory.description}
            placeholder="Description"
            onChange={handleCategoryChange}
            className="luxury-input"
          />
          <button
            onClick={handleAddCategory}
            className="luxury-btn green"
          >
            Ajouter Catégorie
          </button>
        </div>
        <ul className="luxury-category-list">
          {categories.map((cat) => (
            <li key={cat._id}>
              <span className="font-semibold">{cat.nom}</span> - {cat.description}
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="luxury-btn red"
                style={{ marginLeft: "10px", padding: "4px 14px" }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
