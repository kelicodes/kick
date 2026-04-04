import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Heroslider.css";

const BASE_URL = "https://kicks-ekpr.onrender.com";

const HeroSlider = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/product/all`)
      .then(res => { if (res.data.allproducts) setProducts(res.data.allproducts); })
      .catch(console.error);
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent((idx + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (!products.length) return;
    const t = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(t);
  }, [current, goTo, products.length]);

  if (!products.length) return null;

  const p = products[current];
  const imgSrc = p.images?.[0]?.url || p.images?.[0] || "";

  return (
    <section className="hero">
      <div className="slide-bg" style={{ backgroundImage: `url(${imgSrc})` }} />

      <div className="slide-content">
        <span className="slide-tag">New arrival</span>
        <h1 className="slide-name">{p.name}</h1>
        <p className="slide-desc">{p.desc}</p>
        <p className="slide-price">Ksh {p.price.toLocaleString()}</p>
        <div className="slide-btns">
          <Link to={`/product/${p._id}`} className="btn-primary">Shop now</Link>
          <Link to="/collection" className="btn-ghost">View all</Link>
        </div>
      </div>

      <div className="slide-img-wrap">
        <img src={imgSrc} alt={p.name} />
      </div>

      <button className="nav-btn nav-prev" onClick={() => goTo(current - 1)}>&#8592;</button>
      <button className="nav-btn nav-next" onClick={() => goTo(current + 1)}>&#8594;</button>

      <div className="dots">
        {products.map((_, i) => (
          <button key={i} className={`dot ${i === current ? "active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>

      <span className="slide-num">
        {String(current + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
      </span>
    </section>
  );
};

export default HeroSlider;