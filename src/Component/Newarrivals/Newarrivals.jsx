import "./Newarrivals.css";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";

export const Newarrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://kicks-ekpr.onrender.com";

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/product/all`);
      if (res.data.allproducts) setProducts(res.data.allproducts);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

  }, []);
  console.log(products)
  return (
    <div className="new-arrivals">
      <h3>NEW ARRIVALS</h3>

      {loading && <p>Loading...</p>}

      <div className="products-container">
        {products.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.images?.[0]} // optional first image
          />
        ))}
      </div>
    </div>
  );
};
