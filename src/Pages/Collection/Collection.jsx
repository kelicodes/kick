import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./Collection.css";

const BASE_URL = "https://kicks-ekpr.onrender.com";

const BRANDS = ["Nike", "Adidas", "Puma", "New Balance", "Reebok"];

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Collection = () => {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState("");
  const [brand, setBrand]         = useState("");

  useEffect(() => {
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
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let temp = [...products];
    if (brand)  temp = temp.filter((p) => p.brand === brand);
    if (search) temp = temp.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low")  temp.sort((a, b) => a.price - b.price);
    if (sort === "high") temp.sort((a, b) => b.price - a.price);
    return temp;
  }, [products, search, sort, brand]);

  const hasFilters = search || sort || brand;

  const clearAll = () => {
    setSearch("");
    setSort("");
    setBrand("");
  };

  return (
    <div className="col-page">

      {/* Header */}
      <div className="col-header">
        <div className="col-title-wrap">
          <p className="col-eyebrow">All products</p>
          <h1 className="col-title">Shop collection</h1>
        </div>
        <span className="col-count">
          {loading ? "Loading..." : `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Toolbar */}
      <div className="col-toolbar">
        <div className="col-search-wrap">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-search"
          />
          {search && (
            <button className="col-search-clear" onClick={() => setSearch("")}>
              <CloseIcon />
            </button>
          )}
        </div>

        <select className="col-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by price</option>
          <option value="low">Low to high</option>
          <option value="high">High to low</option>
        </select>

        <select className="col-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">All brands</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {hasFilters && (
          <button className="col-clear-btn" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {/* Active filter pills */}
      {hasFilters && (
        <div className="col-pills">
          {search && (
            <span className="col-pill">
              Search: {search}
              <button onClick={() => setSearch("")}><CloseIcon /></button>
            </span>
          )}
          {brand && (
            <span className="col-pill">
              {brand}
              <button onClick={() => setBrand("")}><CloseIcon /></button>
            </span>
          )}
          {sort && (
            <span className="col-pill">
              {sort === "low" ? "Price: low to high" : "Price: high to low"}
              <button onClick={() => setSort("")}><CloseIcon /></button>
            </span>
          )}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="col-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="col-skeleton">
              <div className="col-skel-img" />
              <div className="col-skel-info">
                <div className="col-skel-line" />
                <div className="col-skel-line col-skel-line--short" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="col-grid">
          {filtered.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.images?.[0]}
            />
          ))}
        </div>
      ) : (
        <div className="col-empty">
          <div className="col-empty-icon">
            <SearchIcon />
          </div>
          <p className="col-empty-title">No products found</p>
          <p className="col-empty-sub">Try adjusting your search or filters</p>
          <button className="col-empty-btn" onClick={clearAll}>Clear filters</button>
        </div>
      )}

    </div>
  );
};