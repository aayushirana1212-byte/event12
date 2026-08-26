import { Link } from "react-router-dom";
import {
  Crown,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import "../css/footer.css";

/* Inline brand icons */

const IcFacebook = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.6-.1-1.4-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
  </svg>
);

const IcInstagram = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
    />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.2"
      cy="6.8"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const IcX = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.4l4.3 5.7L17.8 3zm-1.1 16h1.7L7.4 4.7H5.6L16.7 19z" />
  </svg>
);

const IcYoutube = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22 8.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16.2 5 12 5 12 5s-4.2 0-7.1.2c-.4.1-1.3.1-2.1.9C2.2 6.7 2 8.2 2 8.2S1.8 10 1.8 11.8v1.6C1.8 15.2 2 17 2 17s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.2 6.9.2 6.9.2s4.2 0 7.1-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.6C22.2 10 22 8.2 22 8.2zM9.8 14.9V8.7l5.9 3.1-5.9 3.1z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const { push } = useToast();

  const subscribe = (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return push(
        "error",
        "Please enter a valid email address."
      );
    }

    push(
      "success",
      "Welcome to the Golden Circle — you are subscribed!"
    );

    setEmail("");
  };

  return (
    <footer className="foot">
      <div className="container">

        {/* Main Footer */}
        <div className="foot-main">

          {/* Brand */}
          <div className="f-brand">
            <Link to="/" className="logo">
              <span className="logo-ic">
                <Crown size={20} />
              </span>

              <span className="logo-t">
                AURELIA
                <small>EVENTS</small>
              </span>
            </Link>

            <p>
              Craftors of golden moments since 2012.
              Weddings, galas, concerts and celebrations
              produced with black-tie precision and an
              obsession for detail.
            </p>

       
       <div className="f-soc">
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Facebook"
  >
    <IcFacebook />
  </a>

  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
  >
    <IcInstagram />
  </a>

  <a
    href="https://x.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="X"
  >
    <IcX />
  </a>

  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="YouTube"
  >
    <IcYoutube />
  </a>
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="f-title">
              Quick Links
            </h4>

            <ul className="f-links">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Events", "/events"],
                ["Venues", "/venues"],
                ["Vendors", "/vendors"],
                ["Gallery", "/gallery"],
                ["Reviews", "/reviews"],
                ["FAQ", "/faq"],
              ].map(([label, to]) => (
                <li key={to + label}>
                  <Link
                    to={to}
                    className="f-link"
                  >
                    <ArrowRight size={13} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="f-title">
              Services
            </h4>

            <ul className="f-links">
              {[
                "Wedding Planning",
                "Corporate Events",
                "Concerts & Festivals",
                "Birthday Galas",
                "Décor & Florals",
                "Catering & Hospitality",
                "Photography & Film",
                "DJ & Live Music",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="f-link"
                  >
                    <ArrowRight size={13} />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="f-title">
              Stay in Gold
            </h4>

            <ul className="f-contact">
              <li>
                <MapPin size={15} />
                128 Crown Avenue, New York, NY 10001
              </li>

              <li>
                <Phone size={15} />
                +1 (555) 123-4567
              </li>

              <li>
                <Mail size={15} />
                hello@aureliaevents.com
              </li>

              <li>
                <Clock size={15} />
                Mon – Sat · 9:00 AM – 8:00 PM
              </li>
            </ul>

            <form
              className="nl"
              onSubmit={subscribe}
            >
              <input
                type="text"
                placeholder="Your email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                aria-label="Email for newsletter"
              />

              <button
                type="submit"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </form>

            <p className="nl-note">
              Join the Golden Circle for private
              offers & event inspiration.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="foot-bot">
          <p>
            © 2026 Aurelia Events. All rights reserved.
            Crafted with gold.
          </p>

          <div className="fb-links">
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/faq">
              FAQ
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}