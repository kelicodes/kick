import { useEffect, useState } from "react";
import axios from "axios";
import "./Mycart.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://kicks-ekpr.onrender.com";

/* ── Skeleton ─────────────────────────────────────────────────── */
const CartSkeleton = () => (
  <div className="cart-skeleton">
    {[1, 2, 3].map((i) => (
      <div className="cart-skel-row" key={i}>
        <div className="skel-sq" />
        <div className="skel-lines">
          <div className="skel-ln w60" />
          <div className="skel-ln w35" />
          <div className="skel-ln w45" />
        </div>
      </div>
    ))}
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */
export const MyCart = () => {
  const [cart, setCart]       = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();
  const token                 = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/cart/mycart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const handleRemove = async (productId, size) => {
    try {
      await axios.delete(`${BASE_URL}/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, size },
      });
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleQuantityChange = async (productId, size, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.post(
        `${BASE_URL}/cart/update`,
        { productId, size, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.productId.price * item.quantity, 0
  ) ?? 0;

  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  /* ── Page header (always rendered) ─────────────────────────── */
  const PageHeader = ({ count }) => (
    <div className="cart-page-header">
      <p className="cart-page-label">Ready to checkout</p>
      <h2 className="cart-page-title">
        MY <span className="ghost">CART</span>
      </h2>
      {count !== null && (
        <p className="cart-item-count">{count} item{count !== 1 ? "s" : ""} in your bag</p>
      )}
    </div>
  );

  /* ── Loading ────────────────────────────────────────────────── */
  if (loading) return (
    <div className="mycart-container">
      <PageHeader count={null} />
      <div className="cart-divider" />
      <div className="cart-layout">
        <CartSkeleton />
      </div>
    </div>
  );

  /* ── Empty ──────────────────────────────────────────────────── */
  if (!cart || cart.items.length === 0) return (
    <div className="mycart-container">
      <div className="cart-empty-state">
        <span className="cart-empty-number">0</span>
        <p className="cart-empty-text">Your bag is empty</p>
        <button className="shop-now-btn" onClick={() => navigate("/collection")}>
          Shop Now →
        </button>
      </div>
    </div>
  );

  /* ── Full cart ──────────────────────────────────────────────── */
  return (
    <div className="mycart-container">
      <PageHeader count={itemCount} />
      <div className="cart-divider" />

      <div className="cart-layout">

        {/* ── Items ─────────────────────────────────────────── */}
        <div className="cart-items">
          {cart.items.map((item) => {
            const lineTotal = item.productId.price * item.quantity;
            return (
              <div
                key={`${item.productId._id}-${item.size}`}
                className="cart-item"
              >
                {/* image */}
                <div className="cart-img-wrap">
                  <img
                    src={item.productId.images[0]}
                    alt={item.productId.name}
                    className="cart-img"
                  />
                </div>

                {/* details */}
                <div className="cart-details">
                  <h4 className="cart-name">{item.productId.name}</h4>

                  <div className="cart-meta">
                    <span className="cart-size-badge">Size {item.size}</span>
                    <span className="cart-unit-price">${item.productId.price} each</span>
                  </div>

                  <p className="cart-line-total">${lineTotal.toFixed(2)}</p>

                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleQuantityChange(item.productId._id, item.size, item.quantity - 1)
                      }
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleQuantityChange(item.productId._id, item.size, item.quantity + 1)
                      }
                    >+</button>
                  </div>
                </div>

                {/* remove */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.productId._id, item.size)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Order summary ──────────────────────────────────── */}
        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row shipping">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-amount">${subtotal.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout →
          </button>

          <p className="summary-secure">🔒 Secure & encrypted checkout</p>
        </div>
      </div>
    </div>
  );
};

export default MyCart;