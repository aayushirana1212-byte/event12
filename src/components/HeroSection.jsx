import { Link } from "react-router-dom";
import { ArrowRight, Crown, Sparkles } from "lucide-react";

import heroImage from "../assets/istockphoto-1171816219-612x612.webp";

import "../css/hero.css";

export default function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <div className="hero-content">

          <div className="hero-brand">
            <span className="hero-icon">
              <Crown size={22} />
            </span>

            <div>
              <h2>AURELIA EVENTS</h2>
              <span>Luxury Events. Beautifully Crafted.</span>
            </div>
          </div>

          <div className="hero-kicker">
            <Sparkles size={15} />
            Luxury Event Management
          </div>

          <h1>
            Where Every Moment{" "}
            <em className="gold-text">
              Turns to Gold
            </em>
          </h1>

          <p>
            Weddings, galas, concerts and celebrations —
            designed, directed and delivered with black-tie
            precision by the world's most detail-obsessed
            event house.
          </p>

          <div className="hero-buttons">
            <Link to="/booking" className="btn btn-gold">
              Book Your Event
              <ArrowRight size={17} />
            </Link>

            <Link to="/events" className="btn btn-line">
              Explore Events
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}