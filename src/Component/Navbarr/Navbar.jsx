import { useState, useEffect } from "react";
import "./Navbar.css";
import { IoMdCart } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

export const Navbar = ({ lightMode, setLightMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={assets.logo} alt="KICKS Logo" />
        KI <span>CKS</span>
      </Link>

      <div className="left">
        <IoMdCart size={24} />
        {lightMode ? (
          <MdDarkMode size={24} onClick={() => setLightMode(false)} />
        ) : (
          <MdLightMode size={24} onClick={() => setLightMode(true)} />
        )}
        <IoMenu size={24} onClick={() => setMenuOpen(!menuOpen)} />
      </div>

      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/collection" onClick={() => setMenuOpen(false)}>Collection</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
};
