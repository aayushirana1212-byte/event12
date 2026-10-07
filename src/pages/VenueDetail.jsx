import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Users,
  Star,
  ArrowLeft,
  ArrowRight,
  Phone,
  Check,
} from "lucide-react";

import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import CTASection from "../components/CTASection";
import NotFound from "./NotFound";
import { VenueCard } from "../components/VenueCards";
import {
  venues,
  venueGalleryPool,
} from "../data/content";

import "../css/global.css";
import "../css/venue-detail.css";

/* ============================================================
   BUILD A 5-IMAGE GALLERY PER VENUE
   Starts at the venue's own photo, then rotates through
   the shared pool so every listing looks distinct.
   ============================================================ */

const GALLERY_SIZE = 5;

function buildGallery(venue) {
  const own = venue.image;
  const rest = venueGalleryPool.filter(
    (img) => img !== own
  );

  const start = (venue.id * 3) % rest.length;

  return [
    own,
    ...Array.from(
      { length: GALLERY_SIZE - 1 },
      (_, i) => rest[(start + i) % rest.length]
    ),
  ];
}

/* ============================================================
   VENUE DETAIL PAGE
   ============================================================ */

export default function VenueDetail() {
  const { id } = useParams();

  const venue = venues.find(
    (v) => String(v.id) === String(id)
  );

  const gallery = useMemo(
    () => (venue ? buildGallery(venue) : []),
    [venue]
  );

  const related = useMemo(() => {
    if (!venue) return [];

    const sameCat = venues.filter(
      (v) =>
        v.id !== venue.id &&
        v.category === venue.category
    );

    const fillers = venues.filter(
      (v) =>
        v.id !== venue.id &&
        v.category !== venue.category
    );

    return [...sameCat, ...fillers].slice(0, 3);
  }, [venue]);

  if (!venue) return <NotFound />;

  const mapsQuery = encodeURIComponent(
    `${venue.name}, ${venue.location}`
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const telHref = venue.contact
    ? `tel:${venue.contact.replace(/\s/g, "")}`
    : null;

  return (
    <>
      <PageBanner
        title={venue.name}
        crumb={venue.category}
        bg={venue.image}
      />

      {/* ================= HERO ================= */}

      <section className="section vd-hero-sec">
        <div className="container">

          <Reveal>
            <Link
              to="/venues"
              className="vd-back"
            >
              <ArrowLeft size={16} />
              All Venues
            </Link>
          </Reveal>

          <div className="vd-hero row g-4 g-lg-5">
            <Reveal className="vd-hero-copy col-12 col-lg-6">
              <span className="vd-cat">
                {venue.category}
              </span>

              <h1>
                {venue.name}
              </h1>

              <p className="vd-loc">
                <MapPin size={16} />
                {venue.location}
              </p>

              <div className="vd-badges">
                {venue.rating != null && (
                  <span className="vd-badge">
                    <Star size={13} />
                    {venue.rating} rating
                  </span>
                )}

                <span className="vd-badge">
                  {venue.reviews > 0
                    ? `${venue.reviews.toLocaleString()} reviews`
                    : "New listing"}
                </span>

                <span className="vd-badge">
                  <Users size={13} />
                  Up to{" "}
                  {venue.capacity.toLocaleString()}{" "}
                  guests
                </span>
              </div>

              <p className="vd-desc">
                {venue.desc}
              </p>
            </Reveal>

            <Reveal delay={120} className="vd-hero-img col-12 col-lg-6">
              <img
                src={venue.image}
                alt={venue.name}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}

      <section className="section alt">
        <div className="container">

          <div className="vd-cols row g-4 g-xl-5">

            {/* ---------- LEFT ---------- */}

            <div className="vd-main col-12 col-lg-8">

              {/* GALLERY */}
              <Reveal>
                <h2 className="vd-h2">
                  Gallery
                </h2>
              </Reveal>

              <div className="vd-gallery">
                {gallery.map((src, i) => (
                  <Reveal
                    key={`${src}-${i}`}
                    delay={i * 80}
                    className={
                      i === 0
                        ? "vd-gal-big"
                        : "vd-gal-sm"
                    }
                  >
                    <img
                      src={src}
                      alt={`${venue.name} — view ${i + 1}`}
                      loading="lazy"
                    />
                  </Reveal>
                ))}
              </div>

              {/* FACILITIES */}
              <Reveal>
                <h2 className="vd-h2">
                  Facilities
                </h2>
              </Reveal>

              <div className="vd-facs">
                {venue.facilities.map((f) => (
                  <span key={f} className="vd-fac">
                    <Check size={13} />
                    {f}
                  </span>
                ))}
              </div>

              {/* LOCATION */}
              <Reveal>
                <h2 className="vd-h2">
                  Location
                </h2>
              </Reveal>

              <Reveal>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vd-map"
                >
                  <MapPin size={18} />
                  <span>
                    <b>{venue.name}</b>
                    {venue.location}
                  </span>
                  <ArrowRight size={16} />
                </a>
              </Reveal>
            </div>

            {/* ---------- RIGHT / BOOKING CARD ---------- */}

            <aside className="vd-side col-12 col-lg-4">
              <div className="vd-book">
                <span className="vd-book-lbl">
                  Starting price
                </span>

                <div className="vd-book-price">
                  ₹{venue.price.toLocaleString()}
                  <small>/ event</small>
                </div>

                <ul className="vd-book-list">
                  <li>
                    <Users size={14} />
                    Capacity:{" "}
                    <b>
                      {venue.capacity.toLocaleString()}{" "}
                      guests
                    </b>
                  </li>

                  {venue.rating != null && (
                    <li>
                      <Star size={14} />
                      Rating: <b>{venue.rating}</b>
                    </li>
                  )}

                  <li>
                    <MapPin size={14} />
                    {venue.location}
                  </li>
                </ul>

                {venue.contact ? (
                  <>
                    <a
                      href={telHref}
                      className="btn btn-line btn-block"
                    >
                      <Phone size={16} />
                      {venue.contact}
                    </a>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-line btn-block"
                    >
                      <MapPin size={16} />
                      Get Directions
                    </a>
                  </>
                ) : (
                  <p className="vd-nocontact">
                    Contact number not listed. Reach
                    us and we will share it.
                  </p>
                )}

                <Link
                  to={`/booking?venue=${venue.id}`}
                  className="btn btn-gold btn-block"
                >
                  Book This Venue
                  <ArrowRight size={16} />
                </Link>

                <p className="vd-note">
                  Free to hold for 48 hours. No
                  payment needed to request a date.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= RELATED ================= */}

      <section className="section">
        <div className="container">

          <SectionHeading
            kicker="You May Also Like"
            title={
              <>
                Nearby{" "}
                <em className="gold-text">
                  Venues
                </em>
              </>
            }
            sub="Hand-picked properties in and around Anand, each one personally inspected."
          />

          <div className="row g-4">
            {related.map((v, i) => (
              <Reveal
                key={v.id}
                delay={(i % 3) * 100}
                className="col-12 col-sm-6 col-lg-4"
              >
                <VenueCard v={v} />
              </Reveal>
            ))}
          </div>

          <Reveal
            className="center"
            delay={150}
          >
            <Link
              to="/venues"
              className="btn btn-line vd-all"
            >
              Explore All {venues.length} Venues
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
