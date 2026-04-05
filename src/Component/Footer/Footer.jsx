import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

/* marquee text repeated for seamless loop */
const MARQUEE_ITEMS = [
  "Premium Kicks", "New Arrivals", "Free Shipping", "Exclusive Drops",
  "Step Up Your Style", "Premium Kicks", "New Arrivals", "Free Shipping",
  "Exclusive Drops", "Step Up Your Style",
];

const socials = [
  { icon: <FaInstagram />, name: "Instagram", href: "#" },
  { icon: <FaFacebookF />, name: "Facebook",  href: "#" },
  { icon: <FaTwitter />,   name: "Twitter",   href: "#" },
  { icon: <FaLinkedinIn />,name: "LinkedIn",  href: "#" },
];

const Footer = () => {
  const [email, setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="footer">

      {/* ── Scrolling marquee strip ──────────────────────── */}
      <div className="footer-marquee">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((text, i) => (
            <span className="marquee-item" key={i}>
              {text}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Four-column grid ─────────────────────────────── */}
      <div className="footer-main">

        {/* 01 — Brand */}
        <div className="footer-col">
          <span className="footer-col-heading">Est. 2024</span>
          {assets.logo
            ? <img src={assets.logo} alt="KICKS" className="footer-logo-img" />
            : <span className="footer-brand-name">KICKS</span>
          }
          <p className="footer-tagline">
            Your go-to store for premium footwear. Step up your style with our exclusive curated collection.
          </p>
        </div>

        {/* 02 — Quick Links */}
        <div className="footer-col">
          <span className="footer-col-heading">Navigate</span>
          <nav className="footer-nav">
            {[
              { label: "Home",       to: "/" },
              { label: "Collection", to: "/collection" },
              { label: "About Us",   to: "/about" },
              { label: "Contact",    to: "/contact" },
              { label: "My Cart",    to: "/mycart" },
              { label: "Orders",     to: "/orders" },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="footer-nav-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 03 — Social */}
        <div className="footer-col">
          <span className="footer-col-heading">Follow Us</span>
          <div className="social-grid">
            {socials.map(({ icon, name, href }) => (
              <a key={name} href={href} className="social-tile" aria-label={name}>
                <span className="social-icon">{icon}</span>
                <span className="social-name">{name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 04 — Newsletter */}
        <div className="footer-col">
          <span className="footer-col-heading">Subscribe</span>
          <p className="footer-newsletter-text">
            Exclusive drops, restocks, and offers — straight to your inbox. No spam, ever.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              {submitted ? "✓ Subscribed" : "Subscribe →"}
            </button>
          </form>
          <p className="newsletter-agree">
            By subscribing you agree to our Privacy Policy. Unsubscribe any time.
          </p>
        </div>

      </div>

      {/* ── Bottom bar ───────────────────────────────────── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} KICKS. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms of Use</a>
          <a href="#" className="footer-bottom-link">Sitemap</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;