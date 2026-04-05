import { Link } from "react-router-dom";
import "./Del.css";

/* icons — using unicode/emoji so no extra deps needed;
   swap for react-icons if preferred */
const STEPS = [
  {
    num: "01",
    icon: "👟",
    name: "Browse & Pick",
    desc: "Explore our curated collection of premium kicks. Filter by brand, size, and style to find your perfect pair.",
  },
  {
    num: "02",
    icon: "🛒",
    name: "Add & Checkout",
    desc: "Add to cart, choose your size, and place your order in seconds. Pay securely via M-Pesa or cash on delivery.",
  },
  {
    num: "03",
    icon: "📦",
    name: "Delivered to You",
    desc: "Sit back while we handle the rest. Your order is packed and delivered straight to your door.",
  },
];

const PERKS = [
  {
    icon: "🚚",
    title: "Free Shipping",
    desc: "Every order ships free, no minimum spend required. We cover the cost so you never have to think twice.",
    tag: "Always free",
  },
  {
    icon: "↩️",
    title: "7-Day Free Returns",
    desc: "Not the right fit? Return within 7 days at zero cost to you. No questions, no hassle, no fine print.",
    tag: "Zero risk",
  },
  {
    icon: "📱",
    title: "M-Pesa Payments",
    desc: "Pay instantly and securely with M-Pesa — Kenya's most trusted mobile money platform. Fast, safe, local.",
    tag: "Instant & secure",
  },
  {
    icon: "✅",
    title: "Verified Authentic",
    desc: "Every pair we sell is 100% authentic. No fakes, no replicas. Your money buys the real deal, every time.",
    tag: "100% genuine",
  },
];

/* ── How It Works ─────────────────────────────────────────────── */
export const HowItWorks = () => (
  <section className="how-it-works">
    <span className="how-bg-text" aria-hidden="true">HOW</span>

    <div className="hiw-header">
      <p className="section-eyebrow">Simple process</p>
      <h2 className="hiw-title">
        HOW IT <span className="ghost">WORKS</span>
      </h2>
      <p className="hiw-subtitle">
        From browsing to your doorstep in three effortless steps. No complexity, no confusion.
      </p>
    </div>

    <div className="hiw-steps">
      {STEPS.map(({ num, icon, name, desc }) => (
        <div className="hiw-step" key={num}>
          <div className="step-badge">
            <span className="step-badge-num">{num}</span>
          </div>
          <span className="step-icon" role="img" aria-label={name}>{icon}</span>
          <h3 className="step-name">{name}</h3>
          <p className="step-desc">{desc}</p>
        </div>
      ))}
    </div>

    <div className="hiw-cta">
      <Link to="/collection" className="hiw-cta-btn">
        Shop Now →
      </Link>
    </div>
  </section>
);

/* ── Why Us ───────────────────────────────────────────────────── */
export const WhyUs = () => (
  <section className="why-us">
    <div className="why-layout">

      {/* Left — sticky title */}
      <div className="why-left">
        <p className="why-eyebrow">The KICKS difference</p>
        <h2 className="why-title">
          WHY<br />
          CHOOSE<br />
          <span className="accent">US?</span>
        </h2>
        <p className="why-body">
          We're not just another online shoe store. Every decision we make — from sourcing to shipping — is built around you.
        </p>

        {/* M-Pesa badge */}
        <div className="mpesa-badge">
          <span className="mpesa-icon" role="img" aria-label="phone">📱</span>
          <div className="mpesa-text">
            <span className="mpesa-label">We accept</span>
            <span className="mpesa-name">M-PESA</span>
          </div>
        </div>
      </div>

      {/* Right — perks grid */}
      <div className="why-perks">
        {PERKS.map(({ icon, title, desc, tag }) => (
          <div className="perk-card" key={title}>
            <div className="perk-icon-wrap" role="img" aria-label={title}>
              {icon}
            </div>
            <h3 className="perk-title">{title}</h3>
            <p className="perk-desc">{desc}</p>
            <span className="perk-tag">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);