import { Link } from "react-router-dom";
import { MapPin, Users, Star, ArrowRight } from "lucide-react";

import Reveal from "./Reveal";
import { venues } from "../data/content";

import "../css/venues.css";

/* ============================================================
   VENUE CARD
============================================================ */

export function VenueCard({ v }) {
  return (
    <article className="card venue-card">

      {/* IMAGE */}
      <div className="imgz vn-img">

        <img
          src={v.image}
          alt={v.name}
          loading="lazy"
        />

        {/* Rating */}
        <span className="vn-rate">
          <Star />
          {v.rating}
        </span>

        {/* Capacity */}
        <span className="vn-cap">
          <Users />
          {v.capacity.toLocaleString()} guests
        </span>

      </div>

      {/* CONTENT */}
      <div className="vn-body">

        <span className="vd-cat">
          {v.category}
        </span>

        <h3>
          {v.name}
        </h3>

        {/* Location */}
        <p className="vn-loc">
          <MapPin />
          {v.location}
        </p>

        {/* Facilities */}
        <div className="fac">

          {v.facilities.slice(0, 3).map((f) => (
            <span key={f}>
              {f}
            </span>
          ))}

          {v.facilities.length > 3 && (
            <span>
              +{v.facilities.length - 3} more
            </span>
          )}

        </div>

        {/* Footer */}
        <div className="vn-foot">

          <div className="vn-price">
            ₹{v.price.toLocaleString()}
            <small>/ event</small>
          </div>

          <Link
            to={`/booking?venue=${v.id}`}
            className="btn btn-line btn-sm"
          >
            Book
          </Link>

        </div>

      </div>

    </article>
  );
}


/* ============================================================
   POPULAR VENUES SECTION
============================================================ */

export default function VenueCards() {
  return (
    <section className="section alt venues-section">

      <div className="container">

        {/* ====================================================
            VENUE HEADING
        ==================================================== */}

        <div className="venue-heading">

          {/* LEFT — KICKER */}
          <div className="venue-kicker">

            <span className="heading-line"></span>

            <span>
              POPULAR
              <br />
              VENUES
            </span>

            <span className="heading-line"></span>

          </div>


          {/* CENTER — TITLE */}
          <div className="venue-title">

            <h2>
              Stages Worthy of{" "}
              <em>
                Your Story
              </em>
            </h2>

          </div>


          {/* RIGHT — DESCRIPTION */}
          <div className="venue-description">

            <p>
              Palaces, rooftops, gardens and
              grand ballrooms — 850+ partner
              venues ready to host your moment.
            </p>

          </div>

        </div>


        {/* ====================================================
            VENUE CARDS
        ==================================================== */}

        <div className="grid g4 venue-grid">

          {venues.slice(0, 4).map((v, i) => (

            <Reveal
              key={v.id}
              delay={(i % 4) * 100}
            >

              <VenueCard v={v} />

            </Reveal>

          ))}

        </div>


        {/* ====================================================
            EXPLORE BUTTON
        ==================================================== */}

        <Reveal
          className="center"
          delay={150}
        >

          <Link
            to="/venues"
            className="btn btn-line venue-explore"
          >
            Explore All Venues
            <ArrowRight />
          </Link>

        </Reveal>

      </div>

    </section>
  );
}