import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { FiSearch } from "react-icons/fi"; // search icon
import "./Collection.css";

export const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // controls visibility of filters

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

  useEffect(() => {
    let temp = [...products];

    if (brand) temp = temp.filter((p) => p.brand === brand);

    if (search)
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    if (sort === "low") temp.sort((a, b) => a.price - b.price);
    else if (sort === "high") temp.sort((a, b) => b.price - a.price);

    setFilteredProducts(temp);
  }, [search, sort, brand, products]);

  return (
    <div className="collection">
      <h2>Shop Collection</h2>

      {/* Search Icon */}
      <div className="search-icon" onClick={() => setShowFilters(!showFilters)}>
        <FiSearch size={24} />
      </div>

      {/* Filters (toggle visibility) */}
      {showFilters && (
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>

          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select Brand</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
          </select>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="collection-products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.images?.[0]}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};
