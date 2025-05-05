import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//  Réutilise la même navbar/footer que Landing
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function ProductDetails() {
  const { id } = useParams(); // 👈 récupérer l'ID du produit à partir de l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    //  Appel API pour récupérer les détails du produit par ID
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
                  Prix: {product.price} TND
                </p>
                <p className="mt-2 text-md text-blueGray-600">
                  Stock: {product.stock}
                </p>
                {product.material && (
                  <p className="mt-2 text-md text-blueGray-600">
                    Matériau: {product.material}
                  </p>
                )}
                {product.type && (
                  <p className="mt-2 text-md text-blueGray-600">
                    Type: {product.type}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
