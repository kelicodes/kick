import React from "react";
import "./Join.css";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext";

const Join = () => {
  const { theme } = useTheme();
  const whatsappLink = "https://chat.whatsapp.com/YOUR_GROUP_LINK";

  return (
    <section className={`join ${theme}`}>
      <div className="join-inner">

        <div className="join-badge">
          <span className="join-badge-dot" />
          Community
        </div>

        <div className="join-text">
          <h2 className="join-heading">
            Be first to know
            <span className="join-heading-accent"> every drop.</span>
          </h2>
          <p className="join-sub">
            New arrivals, exclusive restocks and member-only deals — straight to
            your WhatsApp. No spam, just kicks.
          </p>
        </div>

        <div className="join-actions">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="join-btn"
          >
            <FaWhatsapp size={20} />
            Join the group
          </a>
          <span className="join-members">
            <span className="join-avatars">
              {["A", "B", "C"].map((l) => (
                <span key={l} className="join-avatar">{l}</span>
              ))}
            </span>
            500+ members
          </span>
        </div>

        <ul className="join-perks">
          {[
            "Early access to new releases",
            "Flash sales & promo codes",
            "Direct chat with the team",
          ].map((perk) => (
            <li key={perk} className="join-perk">
              <span className="join-perk-icon" />
              {perk}
            </li>
          ))}
        </ul>

      </div>

      <div className="join-visual" aria-hidden="true">
        <div className="join-ring join-ring--1" />
        <div className="join-ring join-ring--2" />
        <div className="join-ring join-ring--3" />
        <FaWhatsapp className="join-wa-icon" />
      </div>
    </section>
  );
};

export default Join;