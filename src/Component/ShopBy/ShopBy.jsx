import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ShopBy.css";

const BASE_URL = "https://kicks-ekpr.onrender.com";

const CATEGORY_META = {
  sneakers:  { label: "Sneakers",   color: "#ff3c00", bg: "#1a0800" },
  running:   { label: "Running",    color: "#00aaff", bg: "#001a2e" },
  casual:    { label: "Casual",     color: "#a855f7", bg: "#120820" },
  sport:     { label: "Sport",      color: "#22c55e", bg: "#041a0c" },
  limited:   { label: "Limited",    color: "#f59e0b", bg: "#1a1000" },
  classic:   { label: "Classic",    color: "#e2e8f0", bg: "#0f0f0f" },
};

const FALLBACK_CATEGORIES = [
  { key: "sneakers", count: 12 },
  { key: "running",  count: 8  },
  { key: "casual",   count: 10 },
  { key: "sport",    count: 6  },
  { key: "limited",  count: 4  },
  { key: "classic",  count: 9  },
];

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [active, setActive]         = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/product/all`);
        const all = res.data.allproducts || [];
        setProducts(all);

        const counts = {};
        all.forEach((p) => {
          const cat = (p.category || "sneakers").toLowerCase();
          counts[cat] = (counts[cat] || 0) + 1;
        });

        const built = Object.entries(counts).map(([key, count]) => ({ key, count }));
        setCategories(built.length ? built : FALLBACK_CATEGORIES);
      } catch {
        setCategories(FALLBACK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImage = (catKey) => {
    const match = products.find(
      (p) => (p.category || "").toLowerCase() === catKey
    );
    if (match?.images?.[0]) {
      const img = match.images[0];
      return typeof img === "string"
        ? img.startsWith("http") ? img : `${BASE_URL}/${img}`
        : img.url || "";
    }
    return "";
  };

  const meta = (key) => CATEGORY_META[key] || { label: key.charAt(0).toUpperCase() + key.slice(1), color: "#fff", bg: "#111" };

  if (loading) {
    return (
      <section className="sbc-section">
        <div className="sbc-header">
          <h2 className="sbc-title">Shop by category</h2>
        </div>
        <div className="sbc-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="sbc-card sbc-skeleton" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="sbc-section">
      <div className="sbc-header">
        <div>
          <p className="sbc-eyebrow">Explore the collection</p>
          <h2 className="sbc-title">Shop by category</h2>
        </div>
        <Link to="/products" className="sbc-view-all">
          View all
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div className="sbc-grid">
        {categories.map(({ key, count }) => {
          const { label, color, bg } = meta(key);
          const img = getImage(key);
          const isActive = active === key;

          return (
            <Link
              to={`/products?category=${key}`}
              key={key}
              className={`sbc-card ${isActive ? "sbc-card--active" : ""}`}
              style={{ "--card-color": color, "--card-bg": bg }}
              onMouseEnter={() => setActive(key)}
              onMouseLeave={() => setActive(null)}
            >
              {img && (
                <div className="sbc-card-img-wrap">
                  <img src={img} alt={label} className="sbc-card-img" />
                </div>
              )}
              <div className="sbc-card-overlay" />
              <div className="sbc-card-body">
                <span className="sbc-card-count">{count} styles</span>
                <h3 className="sbc-card-label">{label}</h3>
                <span className="sbc-card-cta">
                  Shop now
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ShopByCategory;