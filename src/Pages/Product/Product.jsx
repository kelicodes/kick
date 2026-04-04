import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const BASE_URL = "https://kicks-ekpr.onrender.com";

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct]         = useState(null);
  const [loading, setLoading]         = useState(false);
  const [mainImage, setMainImage]     = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showPopup, setShowPopup]     = useState(false);
  const [adding, setAdding]           = useState(false);
  const [wished, setWished]           = useState(false);

  useEffect(() => {
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
    fetchProduct();
  }, [id]);

  const allSizes = product?.sizes?.map((s) => s.size.split(",")).flat() || [];

  const confirmSize = async () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    try {
      setAdding(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        navigate("/login");
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/cart/addtocart`,
        { productId: product._id, size: selectedSize, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setShowPopup(false);
        setSelectedSize("");
        navigate("/mycart");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="pp-loading">
        <div className="pp-skeleton pp-skeleton--img" />
        <div className="pp-skeleton-details">
          <div className="pp-skeleton pp-skeleton--line" style={{ width: "40%" }} />
          <div className="pp-skeleton pp-skeleton--line pp-skeleton--title" />
          <div className="pp-skeleton pp-skeleton--line" style={{ width: "25%" }} />
          <div className="pp-skeleton pp-skeleton--line" style={{ width: "80%" }} />
          <div className="pp-skeleton pp-skeleton--line" style={{ width: "65%" }} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pp-empty">
        <p>Product not found.</p>
        <Link to="/products" className="pp-back-link">Back to shop</Link>
      </div>
    );
  }

  return (
    <>
      <div className="pp">

        {/* ── Images ── */}
        <div className="pp-images">
          <div className="pp-main-img">
            <img src={mainImage} alt={product.name} />
          </div>
          {product.images?.length > 1 && (
            <div className="pp-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`pp-thumb ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details ── */}
        <div className="pp-details">

          <p className="pp-breadcrumb">
            <Link to="/">Home</Link> &rsaquo; <Link to="/collection">Shop</Link> &rsaquo; <span>{product.name}</span>
          </p>

          <div className="pp-badges">
            <span className="pp-badge pp-badge--new">New arrival</span>
            <span className="pp-badge pp-badge--stock">In stock</span>
          </div>

          <h1 className="pp-name">{product.name}</h1>

          <div className="pp-price-row">
            <span className="pp-price">Ksh {product.price.toLocaleString()}</span>
          </div>

          <div className="pp-divider" />

          <p className="pp-desc">{product.desc}</p>

          {/* Sizes */}
          {allSizes.length > 0 && (
            <div className="pp-size-section">
              <p className="pp-section-label">
                Select size
                {selectedSize && <span className="pp-selected-size"> — {selectedSize}</span>}
              </p>
              <div className="pp-sizes">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    className={`pp-size ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pp-actions">
            <button
              className="pp-btn-cart"
              onClick={() => setShowPopup(true)}
            >
              Add to cart
            </button>
            <button className="pp-btn-buy" onClick={confirmSize}>
              Buy now
            </button>
            <button
              className={`pp-btn-wish ${wished ? "wished" : ""}`}
              onClick={() => setWished((w) => !w)}
              aria-label="Wishlist"
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>

          {/* Meta grid */}
          <div className="pp-meta">
            {[
              { label: "Category", value: product.category || "Sneakers" },
              { label: "Brand",    value: product.brand || product.name },
              { label: "Delivery", value: "2–4 business days" },
              { label: "Returns",  value: "7-day free returns" },
            ].map(({ label, value }) => (
              <div key={label} className="pp-meta-item">
                <span className="pp-meta-label">{label}</span>
                <span className="pp-meta-value">{value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Size Popup ── */}
      {showPopup && (
        <div className="pp-overlay" onClick={() => setShowPopup(false)}>
          <div className="pp-popup" onClick={(e) => e.stopPropagation()}>
            <div className="pp-popup-header">
              <div>
                <h3 className="pp-popup-title">Choose your size</h3>
                <p className="pp-popup-sub">Select a size to add to cart</p>
              </div>
              <button className="pp-popup-close" onClick={() => setShowPopup(false)}>✕</button>
            </div>

            <div className="pp-sizes">
              {allSizes.map((size) => (
                <button
                  key={size}
                  className={`pp-size ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="pp-popup-actions">
              <button
                className="pp-btn-cart"
                onClick={confirmSize}
                disabled={adding}
              >
                {adding ? "Adding..." : "Add to cart"}
              </button>
              <button
                className="pp-popup-cancel"
                onClick={() => { setShowPopup(false); setSelectedSize(""); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};