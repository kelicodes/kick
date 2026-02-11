import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo & About */}
        <div className="footer-logo">
          <img src={assets.logo} alt="KICKS Logo" />
          <p>
            KICKS is your go-to store for premium shoes. Step up your style with our exclusive collection.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/collection">Collection</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h4>Subscribe</h4>
          <p>Get updates about our latest products and exclusive offers.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KICKS. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
