import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const BASE_URL = "https://kicks-ekpr.onrender.com";

  // Fetch single product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/product/product/${id}`);
      if (res.data.success) {
        setProduct(res.data.theproduct);
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

  const allSizes = product?.sizes.map((s) => s.size.split(",")).flat() || [];

  const handleAddToCart = () => setShowSizePopup(true);

  const confirmSize = () => {
    if (!selectedSize) return alert("Please select a size!");
    console.log(`Adding product ${product._id} of size ${selectedSize} to cart`);
    setShowSizePopup(false);
    setSelectedSize("");
  };

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p className="loading">Product not found</p>;

  return (
    <div className="product-page">
      {/* Product Images */}
      <div className="product-image">
        <img src={mainImage} alt={product.name} className="main-image" />
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

      {/* Product Details */}
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">KSH{product.price}</p>
        <p className="product-description">{product.desc}</p>

        {/* Available Sizes on Product Info */}
        <div className="available-sizes">
          <h4>Available Sizes:</h4>
          <div className="sizes-grid">
            {allSizes.map((size) => (
              <div key={size} className="size-box">{size}</div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>

      {/* Size Selection Popup */}
      {showSizePopup && (
        <div className="size-popup">
          <div className="popup-content">
            <h3>Select the size you want</h3>
            <div className="sizes-grid">
              {allSizes.map((size) => (
                <div
                  key={size}
                  className={`size-box ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="popup-buttons">
              <button className="confirm-size" onClick={confirmSize}>
                Add to Cart
              </button>
              <button
                className="close-popup"
                onClick={() => {
                  setShowSizePopup(false);
                  setSelectedSize("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
