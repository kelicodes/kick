import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import { assets } from "../../assets/assets";

const Banner = ({ lightMode }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`banner ${animate ? "animate" : ""}`}>
      <div className="banner-text">
        <h1 className="fade-up delay-1">Step Up Your Style</h1>
        <p className="fade-up delay-2">
          Discover our exclusive collection of shoes for every occasion.
        </p>
        <Link to="/collection" className="btn fade-up delay-3">
          Shop Now
        </Link>
      </div>

      <div className="banner-image slide-in">
        <img
          src={lightMode ? assets.bannerlight : assets.bannerdark}
          alt="Shoes Banner"
        />
      </div>
    </section>
  );
};

export default Banner;
