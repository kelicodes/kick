import { useState } from "react";
import "./Navbar.css";
import { IoMdCart } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",       to: "/" },
  { label: "Collection", to: "/collection" },
  { label: "About",      to: "/about" },
  { label: "Contact",    to: "/contact" },
];

export const Navbar = ({ lightMode, setLightMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">

        {/* ── Logo ──────────────────────────────────── */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          {assets.logo && (
            <img src={assets.logo} alt="KICKS" className="nav-logo-img" />
          )}
          <span className="nav-logo-text">
            KI<span>CKS</span>
          </span>
        </Link>

        {/* ── Centre links (desktop) ────────────────── */}
        <div className="nav-links">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Right actions ─────────────────────────── */}
        <div className="nav-actions">

          {/* Cart */}
          <Link to="/mycart" className="nav-action-btn nav-cart-wrap" aria-label="Cart">
            <IoMdCart size={20} />
          </Link>

          {/* Theme toggle */}
          <button
            className="nav-action-btn"
            onClick={() => setLightMode(!lightMode)}
            aria-label="Toggle theme"
          >
            {lightMode
              ? <MdDarkMode size={20} />
              : <MdLightMode size={20} />
            }
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="nav-action-btn nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>

        </div>
      </nav>

      {/* ── Mobile full-screen menu ──────────────────── */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {label}
              <span className="mobile-arrow">→</span>
            </Link>
          ))}

          <Link to="/cart" className="mobile-menu-link" onClick={closeMenu}>
            Cart
            <span className="mobile-arrow">→</span>
          </Link>

          {/* theme toggle row */}
          <div className="mobile-menu-bottom">
            <span className="mobile-bottom-label">
              {lightMode ? "Light mode" : "Dark mode"}
            </span>
            <button
              className="nav-action-btn"
              onClick={() => setLightMode(!lightMode)}
              style={{ marginLeft: "auto" }}
            >
              {lightMode ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};