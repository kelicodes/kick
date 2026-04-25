import "./Newarrivals.css";
import Card from "../Card/Card";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ── Skeleton placeholder while loading ───────────────────────── */
const SkeletonGrid = ({ count = 8 }) => (
  <div className="loading-grid">
    {Array.from({ length: count }).map((_, i) => (
      <div className="skeleton-card" key={i}>
        <div className="skeleton-img" />
        <div className="skeleton-info">
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      </div>
    ))}
  </div>
);

/* ── Draggable horizontal scroll ──────────────────────────────── */
const useDragScroll = () => {
  const ref = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  };
  const onMouseLeave = () => { isDown.current = false; };
  const onMouseUp = () => { isDown.current = false; };
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
};

/* ── Main component ───────────────────────────────────────────── */
export const Newarrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dragScroll = useDragScroll();
  const navigate=useNavigate()

  const BASE_URL = "https://kicks-juxo.onrender.com";

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

  /* split: first 8 → new arrivals grid; rest → trending scroll */
  const newArrivals = products.slice(0, 8);
  const trending    = products.length > 8 ? products.slice(8) : products;

  return (
    <div className="new-arrivals">

      {/* ── NEW ARRIVALS ───────────────────────────── */}
      <div className="arrivals-header">
        <div className="header-left">
          <p className="section-label">Just dropped</p>
          <h2 className="section-title">
            NEW <span className="ghost">ARRIVALS</span>
          </h2>
        </div>
        <div className="header-right">
          <button onClick={()=>navigate("/collection")} className="view-all-btn">View all →</button>
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="products-container">
          {newArrivals.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.images?.[0]}
            />
          ))}
        </div>
      )}

      {/* ── TRENDING NOW ───────────────────────────── */}
      {!loading && trending.length > 0 && (
        <section className="trending-section">
          <div className="trending-strip">
            <div className="trending-header">
              <div className="header-left">
                <p className="section-label">Moving fast</p>
                <h2 className="section-title">
                  TRENDING <span className="ghost">NOW</span>
                </h2>
              </div>
              <div className="header-right">
                <button onClick={()=>navigate("/collection")} className="view-all-btn">Browse all →</button>
              </div>
            </div>

            <div
              className="trending-scroll-wrapper"
              ref={dragScroll.ref}
              onMouseDown={dragScroll.onMouseDown}
              onMouseLeave={dragScroll.onMouseLeave}
              onMouseUp={dragScroll.onMouseUp}
              onMouseMove={dragScroll.onMouseMove}
            >
              <div className="trending-cards">
                {trending.map((product) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.images?.[0]}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};