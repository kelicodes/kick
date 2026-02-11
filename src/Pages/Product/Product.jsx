import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");

  const BASE_URL = "https://kicks-ekpr.onrender.com";

  // Fetch single product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.theproduct);
        // set first image as default
        setMainImage(res.data.theproduct.images?.[0] || "");
      }
    } catch (err) {
      console.error("Error fetching product:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p className="loading">Product not found</p>;

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={mainImage} alt={product.name} className="main-image" />

        {/* Thumbnails */}
        <div className="thumbnails">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx}`}
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
