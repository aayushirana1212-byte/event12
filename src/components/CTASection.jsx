import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { IMG } from "../data/content";
import "../css/cta.css";

/* Full-width call-to-action banner (reused across pages) */

export default function CTASection({
  title = "Ready to Write Your Golden Chapter?",
  sub = "One conversation is all it takes. Tell us your dream — our designers will return a bespoke plan within 48 hours.",
}) {
  return (
    <section
      className="cta"
      style={{ backgroundImage: `url(${IMG.cta})` }}
    >
      <div className="container cta-in">
        <Reveal>
          <span className="kicker">Begin Today</span>

          <h2>{title}</h2>

          <p>{sub}</p>

          <div className="cta-btns">
            <Link to="/booking" className="btn btn-gold">
              Book Your Event <ArrowRight />
            </Link>

            <a
              href="tel:+15551234567"
              className="btn btn-ghost"
            >
              <Phone /> +1 (555) 123-4567
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}