import React from "react";
import "./Join.css";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext"; // your theme context

const Join = () => {
  const { theme } = useTheme(); // 'light' or 'dark'

  // Replace this with your WhatsApp group invite link
  const whatsappLink = "https://chat.whatsapp.com/YOUR_GROUP_LINK";

  return (
    <section className={`join ${theme}`}>
      <div className="join-content">
        <h2>Join Our WhatsApp Group!</h2>
        <p>
          Stay updated with our latest collections, exclusive offers, and
          promotions. Join our community now!
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="join-btn"
        >
          <FaWhatsapp size={20} style={{ marginRight: "8px" }} />
          Join Now
        </a>
      </div>
    </section>
  );
};

export default Join;
