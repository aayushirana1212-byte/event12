import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Star,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { events } from "../data/content";

/* Reusable event card (also used on the Events page) */

export function EventCard({ ev, onView }) {
  return (
    <article className="card">
      <div
        className="imgz ev-img"
        onClick={() => onView?.(ev)}
        style={onView ? { cursor: "pointer" } : undefined}
      >
        <img
          src={ev.image}
          alt={ev.title}
          loading="lazy"
        />

        <span className="badge ev-cat">
          {ev.category}
        </span>

        <span className="ev-date">
          <CalendarDays /> {ev.short}
        </span>
      </div>

      <div className="ev-body">
        <h3 className="ev-title">
          {ev.title}
        </h3>

        <div className="ev-meta">
          <span>
            <MapPin /> {ev.location}
          </span>

          <span>
            <Clock /> {ev.time}
          </span>

          <span>
            <Star style={{ fill: "var(--gold)" }} />{" "}
            {ev.rating}
          </span>
        </div>

        <div className="ev-foot">
          <div className="ev-price">
            <small>From</small>
            ${ev.price.toLocaleString()}
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            {onView && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => onView(ev)}
              >
                Details
              </button>
            )}

            <Link
              to={`/booking?type=${encodeURIComponent(
                ev.category
              )}`}
              className="btn btn-gold btn-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* Home — featured events section */

export default function FeaturedEvents() {
  const featured = events
    .filter((e) => e.featured)
    .slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          kicker="Featured Events"
          title={
            <>
              This Season's{" "}
              <em className="gold-text">
                Golden Calendar
              </em>
            </>
          }
          sub="Hand-picked experiences currently open for booking — reserve your place before the curtain rises."
        />

        <div className="grid g3">
          {featured.map((ev, i) => (
            <Reveal
              key={ev.id}
              delay={i * 120}
            >
              <EventCard ev={ev} />
            </Reveal>
          ))}
        </div>

        <Reveal
          className="center"
          delay={150}
        >
          <Link
            to="/events"
            className="btn btn-line"
            style={{ marginTop: 48 }}
          >
            View All Events <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}