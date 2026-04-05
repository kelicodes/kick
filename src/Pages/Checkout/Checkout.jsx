import { useEffect, useState } from "react";
import axios from "axios";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://kicks-ekpr.onrender.com";

/* ── Skeleton ─────────────────────────────────────────────────── */
const CheckoutSkeleton = () => (
  <div className="checkout-skeleton">
    {[1, 2, 3].map((i) => (
      <div className="skel-row" key={i}>
        <div className="skel-sq" />
        <div className="skel-lines">
          <div className="skel-ln w65" />
          <div className="skel-ln w40" />
          <div className="skel-ln w50" />
        </div>
      </div>
    ))}
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */
export const Checkout = () => {
  const [cart, setCart]               = useState(null);
  const [loading, setLoading]         = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate                      = useNavigate();
  const token                         = localStorage.getItem("token");

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

  const subtotal = cart?.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity, 0
  ) ?? 0;

  const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) return;
    try {
      setPlacingOrder(true);
      const res = await axios.post(
        `${BASE_URL}/order/place`,
        { paymentMethod: "cod" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setOrderSuccess(true);
        setCart(null);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setPlacingOrder(false);
      setShowConfirm(false);
    }
  };

  /* ── Page header ──────────────────────────────────────────── */
  const PageHeader = () => (
    <div className="checkout-header">
      <p className="checkout-label">Almost there</p>
      <h2 className="checkout-title">
        CHECK <span className="ghost">OUT</span>
      </h2>
    </div>
  );

  /* ── Loading ────────────────────────────────────────────────── */
  if (loading) return (
    <div className="checkout-container">
      <PageHeader />
      <div className="checkout-divider" />
      <div className="checkout-layout">
        <CheckoutSkeleton />
      </div>
    </div>
  );

  /* ── Order success ──────────────────────────────────────────── */
  if (orderSuccess) return (
    <div className="checkout-container">
      <div className="order-success">
        <span className="success-graphic">DONE</span>
        <p className="success-msg">Order placed successfully</p>
        <p className="success-sub">Pay on delivery · We'll be in touch shortly</p>
        <button className="success-cta" onClick={() => navigate("/collection")}>
          Continue Shopping →
        </button>
      </div>
    </div>
  );

  /* ── Empty ──────────────────────────────────────────────────── */
  if (!cart || cart.items.length === 0) return (
    <div className="checkout-container">
      <div className="checkout-empty-state">
        <span className="empty-ghost-text">EMPTY</span>
        <p className="empty-label">Nothing to checkout yet</p>
        <button className="go-shop-btn" onClick={() => navigate("/collection")}>
          Shop Collection →
        </button>
      </div>
    </div>
  );

  /* ── Full checkout ──────────────────────────────────────────── */
  return (
    <div className="checkout-container">
      <PageHeader />
      <div className="checkout-divider" />

      <div className="checkout-layout">

        {/* LEFT: items + payment */}
        <div>

          {/* order items */}
          <div className="checkout-section">
            <div className="step-label">
              <span className="step-num">1</span>
              Review Items
            </div>
            <div className="checkout-items">
              {cart.items.map((item) => (
                <div
                  key={`${item.productId._id}-${item.size}`}
                  className="checkout-item"
                >
                  <div className="checkout-img-wrap">
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className="checkout-img"
                    />
                  </div>
                  <div className="checkout-item-info">
                    <h4 className="checkout-item-name">{item.productId.name}</h4>
                    <div className="checkout-item-meta">
                      <span className="checkout-badge">Size {item.size}</span>
                      <span className="checkout-badge">Qty {item.quantity}</span>
                    </div>
                    <p className="checkout-item-price">
                      KSH{(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* payment method */}
          <div className="checkout-section" style={{ marginTop: "1px" }}>
            <div className="step-label">
              <span className="step-num">2</span>
              Payment Method
            </div>
            <div className="payment-methods">
              <div className="payment-option selected">
                <div className="payment-radio" />
                <div className="payment-text">
                  <span className="payment-name">Cash on Delivery</span>
                  <span className="payment-desc">Pay when your order arrives</span>
                </div>
              </div>
              <div className="payment-option disabled">
                <div className="payment-radio" />
                <div className="payment-text">
                  <span className="payment-name">Card / Mobile Money</span>
                  <span className="payment-desc">Visa, M-Pesa, Airtel Money</span>
                </div>
                <span className="payment-badge-soon">Soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: summary */}
        <div className="order-summary-panel">
          <h3 className="summary-heading">Order Summary</h3>

          <div className="summary-line">
            <span>Subtotal ({itemCount} items)</span>
            <span>KSH{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line free">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-line">
            <span>Payment</span>
            <span>Cash on Delivery</span>
          </div>

          <div className="summary-hr" />

          <div className="summary-total">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-amount">KSH{subtotal.toFixed(2)}</span>
          </div>

          <button
            className="place-order-btn"
            onClick={() => setShowConfirm(true)}
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order…" : "Place Order →"}
          </button>

          <p className="summary-note">🔒 Secure · Cash on delivery</p>
        </div>
      </div>

      {/* ── Confirm modal ──────────────────────────────────── */}
      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-title">Confirm Order</h3>
            <p className="confirm-body">
              You're about to place a cash-on-delivery order for:
            </p>
            <p className="confirm-amount">KSH{subtotal.toFixed(2)}</p>
            <div className="confirm-actions">
              <button
                className="confirm-yes"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? "Placing…" : "Yes, Place Order"}
              </button>
              <button
                className="confirm-no"
                onClick={() => setShowConfirm(false)}
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

export default Checkout;