import React from "react";
import "./Banner.css";
import { useTheme }  from "../../Context/ThemeContext"
import { assets } from "../../assets/assets";


const Banner = ({ lightMode }) => {
  return (
    <section className="banner">
      <div className="banner-text">
        <h1>Step Up Your Style</h1>
        <p>Discover our exclusive collection of shoes for every occasion.</p>
        <a href="/collection" className="btn">Shop Now</a>
      </div>

      <div className="banner-image">
        <img
          src={lightMode ? assets.bannerlight : assets.bannerdark}
          alt="Shoes Banner"
        />
      </div>
    </section>
  );
};


export default Banner;
