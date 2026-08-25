import { Link } from "react-router-dom";
import {
  Star,
  Award,
  BadgeDollarSign,
  Phone,
  ArrowRight,
} from "lucide-react";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { vendors } from "../data/content";

/* Reusable vendor card */
export function VendorCard({ v }) {
  return (
    <article className="card">
      <div className="imgz vd-img">
        <img
          src={v.image}
          alt={v.name}
          loading="lazy"
        />
      </div>

      <div className="vd-body">
        <span className="vd-cat">
          {v.category}
        </span>

        <h3>{v.name}</h3>

        <div className="vd-rate">
          <span className="stars">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star className={v.rating < 4.9 ? "off" : ""} />
          </span>

          <b style={{ color: "var(--gold)" }}>
            {v.rating}
          </b>

          <span>
            ({v.reviews} reviews)
          </span>
        </div>

        <ul className="vd-rows">
          <li>
            <Award />
            <b>{v.experience} yrs</b> experience
          </li>

          <li>
            <BadgeDollarSign />
            {v.price}
          </li>
        </ul>

        <div className="vd-foot">
          <Link
            to={`/booking?type=${encodeURIComponent(v.category)}`}
            className="btn btn-gold btn-sm"
            style={{ flex: 1 }}
          >
            Book Now
          </Link>

          <a
            className="vd-call"
            href={`tel:${v.phone.replace(/\s/g, "")}`}
            aria-label={`Call ${v.name}`}
            title={v.phone}
          >
            <Phone />
          </a>
        </div>
      </div>
    </article>
  );
}

/* Home — top vendors section */
export default function VendorCards() {
  return (
    <section className="section">
      <div className="container">

        <SectionHeading
          kicker="Top Vendors"
          title={
            <>
              The Elite Behind{" "}
              <em className="gold-text">
                The Magic
              </em>
            </>
          }
          sub="Photographers, caterers, artists and performers — each vetted, insured and rated by real celebrations."
        />

        <div className="grid g4">
          {vendors.slice(0, 4).map((v, i) => (
            <Reveal
              key={v.id}
              delay={(i % 4) * 100}
            >
              <VendorCard v={v} />
            </Reveal>
          ))}
        </div>

        <Reveal
          className="center"
          delay={150}
        >
          <Link
            to="/vendors"
            className="btn btn-line"
            style={{ marginTop: 48 }}
          >
            Meet All Vendors <ArrowRight />
          </Link>
        </Reveal>

      </div>
    </section>
  );
}