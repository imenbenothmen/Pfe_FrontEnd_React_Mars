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
} from "../../services/Apicategory"; // Supprimer le `renameCategory` ici

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
    image: "", // à gérer avec multer si upload
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

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct);
      fetchProducts();
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
    setNewProduct({
      ...prod,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestion des Produits</h2>

      {/* Formulaire d'ajout/modification produit */}
      <input
        name="name"
        value={newProduct.name}
        placeholder="Nom"
        onChange={handleProductChange}
        className="border p-2 m-1"
      />
      <input
        name="description"
        value={newProduct.description}
        placeholder="Description"
        onChange={handleProductChange}
        className="border p-2 m-1"
      />
      <input
        name="price"
        type="number"
        value={newProduct.price}
        placeholder="Prix"
        onChange={handleProductChange}
        className="border p-2 m-1"
      />
      <input
        name="stock"
        type="number"
        value={newProduct.stock}
        placeholder="Stock"
        onChange={handleProductChange}
        className="border p-2 m-1"
      />
      <select
        name="category"
        value={newProduct.category}
        onChange={handleProductChange}
        className="border p-2 m-1"
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
        className="border p-2 m-1"
      />
      <input
        name="type"
        value={newProduct.type}
        placeholder="Type"
        onChange={handleProductChange}
        className="border p-2 m-1"
      />

      <button
        onClick={newProduct._id ? () => handleUpdateProduct(newProduct._id) : handleAddProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded m-2"
      >
        {newProduct._id ? "Mettre à jour le produit" : "Ajouter Produit"}
      </button>

      {/* Table des produits */}
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Catégorie</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td className="border p-2">{prod.name}</td>
              <td className="border p-2">{prod.price} DT</td>
              <td className="border p-2">{prod.stock}</td>
              <td className="border p-2">
                {categories.find((c) => c._id === prod.category)?.nom || ""}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEditProduct(prod)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteProduct(prod._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gestion des catégories */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Gestion des Catégories</h2>
      <input
        name="nom"
        value={newCategory.nom}
        placeholder="Nom catégorie"
        onChange={handleCategoryChange}
        className="border p-2 m-1"
      />
      <input
        name="description"
        value={newCategory.description}
        placeholder="Description"
        onChange={handleCategoryChange}
        className="border p-2 m-1"
      />

      <button
        onClick={handleAddCategory}
        className="bg-green-500 text-white px-4 py-2 rounded m-2"
      >
        Ajouter Catégorie
      </button>

      <ul className="list-disc ml-6">
        {categories.map((cat) => (
          <li key={cat._id} className="mb-2">
            <span className="font-semibold">{cat.nom}</span> - {cat.description}
            <button
              onClick={() => handleDeleteCategory(cat._id)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
