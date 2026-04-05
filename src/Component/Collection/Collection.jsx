import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./Collection.css";

/* ── Skeleton ─────────────────────────────────────────────────── */
const SkeletonGrid = ({ count = 10 }) => (
  <div className="collection-skeleton">
    {Array.from({ length: count }).map((_, i) => (
      <div className="skel-card" key={i}>
        <div className="skel-img" />
        <div className="skel-body">
          <div className="skel-line" />
          <div className="skel-line short" />
        </div>
      </div>
    ))}
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */
export const Collection = () => {
  const [products, setProducts]               = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort]                       = useState("");
  const [brand, setBrand]                     = useState("");
  const [loading, setLoading]                 = useState(false);

  const BASE_URL = "https://kicks-ekpr.onrender.com";

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

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    let temp = [...products];
    if (brand) temp = temp.filter((p) => p.brand === brand);
    if (sort === "low")  temp.sort((a, b) => a.price - b.price);
    else if (sort === "high") temp.sort((a, b) => b.price - a.price);
    setFilteredProducts(temp);
  }, [sort, brand, products]);

  const clearFilters = () => { setSort(""); setBrand(""); };
  const hasActiveFilters = sort || brand;

  /* unique brands from fetched data */
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  return (
    <div className="collection">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="collection-header">
        <div className="collection-header-left">
          <p className="collection-label">Everything, curated</p>
          <h2 className="collection-title">
            SHOP <span className="ghost">COLLECTION</span>
          </h2>
          {!loading && (
            <p className="product-count">
              {filteredProducts.length} of {products.length} styles
            </p>
          )}
        </div>

        {/* ── Filters ─────────────────────────────────────── */}
        <div className="filter-bar">
          {/* brand pills — generated from real data */}
          {brands.map((b) => (
            <button
              key={b}
              className={`filter-pill${brand === b ? " active" : ""}`}
              onClick={() => setBrand(brand === b ? "" : b)}
            >
              {b}
            </button>
          ))}

          {/* sort select */}
          <div className="filter-select-wrap">
            <select
              className={`filter-select${sort ? " has-value" : ""}`}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort: Featured</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

          {/* clear when active */}
          {hasActiveFilters && (
            <button className="filter-pill" onClick={clearFilters}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Animated divider ────────────────────────────────── */}
      <div className="collection-divider" />

      {/* ── Grid ─────────────────────────────────────────────── */}
      {loading ? (
        <SkeletonGrid count={10} />
      ) : (
        <div className="collection-products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.images?.[0]}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-state-number">0</span>
              <p className="empty-state-text">No products match your filters</p>
              <button className="empty-clear-btn" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};