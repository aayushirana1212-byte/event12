import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CalendarSearch,
  X,
  MapPin,
  Clock,
  Star,
  CalendarDays,
  Users,
} from "lucide-react";

import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import Pagination from "../components/Pagination";
import CTASection from "../components/CTASection";
import { EventCard } from "../components/FeatureEvents";
import { events, eventCategories } from "../data/content";

import "../css/events.css";

const PER_PAGE = 6;

/* ============ EVENTS PAGE — search, filter, details modal, pagination ============ */
export default function Events() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);
  const [view, setView] = useState(null);

  // Search + category filter
  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat = cat === "All" || e.category === cat;

      const matchQ = (
        e.title +
        e.location +
        e.category
      )
        .toLowerCase()
        .includes(q.toLowerCase());

      return matchCat && matchQ;
    });
  }, [q, cat]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const pageItems = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  // Category select
  const pick = (c) => {
    setCat(c);
    setPage(1);
  };

  return (
    <>
      <PageBanner title="Events Calendar" crumb="Events" />

      <section className="section">
        <div className="container">

          {/* Controls */}
          <Reveal>
            <div className="ev-controls">

              {/* Search */}
              <div className="ev-search">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search events, locations..."
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Search events"
                />

                {q && (
                  <button
                    onClick={() => {
                      setQ("");
                      setPage(1);
                    }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="tag-row">
                {eventCategories.map((c) => (
                  <button
                    key={c}
                    className={`pill ₹{cat === c ? "on" : ""}`}
                    onClick={() => pick(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

            </div>
          </Reveal>

          {/* Events Grid */}
          {pageItems.length > 0 ? (
            <div
              className="grid g3"
              style={{ marginTop: 44 }}
            >
              {pageItems.map((ev, i) => (
                <Reveal
                  key={ev.id}
                  delay={(i % 3) * 100}
                >
                  <EventCard
                    ev={ev}
                    onView={setView}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty">
              <CalendarSearch />

              <h3>No events found</h3>

              <p>
                Try another keyword or category — new golden
                experiences are added weekly.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              page={page}
              total={totalPages}
              onChange={setPage}
            />
          )}

        </div>
      </section>

      {/* Event Details Modal */}
      {view && (
        <div
          className="modal-ov"
          onClick={() => setView(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              className="m-close"
              onClick={() => setView(null)}
              aria-label="Close"
            >
              <X />
            </button>

            {/* Image */}
            <div className="evm-img">
              <img
                src={view.image}
                alt={view.title}
              />
            </div>

            {/* Body */}
            <div className="evm-body">

              <span className="badge">
                {view.category}
              </span>

              <h3>{view.title}</h3>

              {/* Event Meta */}
              <div className="evm-meta">

                <span>
                  <CalendarDays />
                  {view.date}
                </span>

                <span>
                  <Clock />
                  {view.time}
                </span>

                <span>
                  <MapPin />
                  {view.location}
                </span>

                <span>
                  <Star />
                  {view.rating} / 5
                </span>

                <span>
                  <Users />
                  Limited seats
                </span>

                <span className="evm-price">
                  ₹{view.price.toLocaleString()}
                  <small> onwards</small>
                </span>

              </div>

              {/* Description */}
              <p className="evm-desc">
                {view.desc}
              </p>

              {/* Actions */}
              <div className="evm-acts">

                <Link
                  to={`/booking?type=₹{encodeURIComponent(
                    view.category
                  )}`}
                  className="btn btn-gold"
                >
                  Book This Event
                </Link>

                <button
                  className="btn btn-ghost"
                  onClick={() => setView(null)}
                >
                  Keep Browsing
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <CTASection />
    </>
  );
}