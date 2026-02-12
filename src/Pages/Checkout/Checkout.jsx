import { useEffect, useState } from "react";
import axios from "axios";
import "./Checkout.css";

const BASE_URL = "https://kicks-ekpr.onrender.com";

export const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false); // for modal

  const token = localStorage.getItem("token");

  // Fetch Cart
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

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart?.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  // Actual order placement
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
        setOrderMessage("Order placed successfully! Pay on delivery.");
        setCart(null); // clear cart in UI
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setOrderMessage("Failed to place order.");
    } finally {
      setPlacingOrder(false);
      setShowConfirm(false); // hide modal after placing order
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0)
    return <p>Your cart is empty. Add items to checkout.</p>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-items">
        {cart.items.map((item) => (
          <div key={`${item.productId._id}-${item.size}`} className="checkout-item">
            <img src={item.productId.images[0]} alt={item.productId.name} />
            <div>
              <h4>{item.productId.name}</h4>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.productId.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ${total}</h3>

      <button onClick={() => setShowConfirm(true)} disabled={placingOrder}>
        {placingOrder ? "Placing Order..." : "Place Order (Cash on Delivery)"}
      </button>

      {orderMessage && <p className="order-message">{orderMessage}</p>}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <h3>Confirm Order</h3>
            <p>Are you sure you want to place this order?</p>
            <div className="confirm-buttons">
              <button onClick={handlePlaceOrder} disabled={placingOrder}>
                Yes, Place Order
              </button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
