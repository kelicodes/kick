import { useEffect, useState } from "react";
import axios from "axios";
import "./MyCart.css";

const BASE_URL = "https://kicks-ekpr.onrender.com";

export const MyCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/cart/mycart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setCart(res.data.cart);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove item
  const handleRemove = async (productId, size) => {
    try {
      await axios.delete(`${BASE_URL}/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, size },
      });

      fetchCart(); // refresh cart
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Update quantity
  const handleQuantityChange = async (productId, size, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.post(
        `${BASE_URL}/cart/update`,
        { productId, size, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (loading) return <p className="cart-loading">Loading cart...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="cart-empty">Your cart is empty.</p>;

  const total = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="mycart-container">
      <h2>My Cart</h2>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={`${item.productId._id}-${item.size}`} className="cart-item">
            <img
              src={item.productId.images[0]}
              alt={item.productId.name}
              className="cart-img"
            />

            <div className="cart-details">
              <h4>{item.productId.name}</h4>
              <p>Size: {item.size}</p>
              <p>Price: ${item.productId.price}</p>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item.productId._id,
                      item.size,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    handleQuantityChange(
                      item.productId._id,
                      item.size,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() =>
                handleRemove(item.productId._id, item.size)
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${total}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default MyCart;
