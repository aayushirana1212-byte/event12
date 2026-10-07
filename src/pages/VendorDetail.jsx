import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Award,
  BadgeDollarSign,
  ArrowLeft,
  ArrowRight,
  Phone,
  PhoneOff,
  Mail,
  Check,
} from "lucide-react";

import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import CTASection from "../components/CTASection";
import NotFound from "./NotFound";
import {
  VendorCard,
  enquiryLink,
} from "../components/VendorCards";
import {
  vendors,
  vendorGalleryPool,
} from "../data/content";

import "../css/global.css";
import "../css/venue-detail.css";
import "../css/vendor-detail.css";

/* ============================================================
   BUILD A 5-IMAGE GALLERY PER VENDOR
   Starts at the vendor's own photo, then rotates through
   the shared pool so every listing looks distinct.
   ============================================================ */

const GALLERY_SIZE = 5;

function buildGallery(vendor) {
  const own = vendor.image;

  const rest = vendorGalleryPool.filter(
    (img) => img !== own
  );

  const start = (vendor.id * 3) % rest.length;

  return [
    own,
    ...Array.from(
      { length: GALLERY_SIZE - 1 },
      (_, i) => rest[(start + i) % rest.length]
    ),
  ];
}

/* ============================================================
   VENDOR DETAIL PAGE
   ============================================================ */

export default function VendorDetail() {
  const { id } = useParams();

  const vendor = vendors.find(
    (v) => String(v.id) === String(id)
  );

  const gallery = useMemo(
    () => (vendor ? buildGallery(vendor) : []),
    [vendor]
  );

  const related = useMemo(() => {
    if (!vendor) return [];

    const sameCat = vendors.filter(
      (v) =>
        v.id !== vendor.id &&
        v.category === vendor.category
    );

    const fillers = vendors.filter(
      (v) =>
        v.id !== vendor.id &&
        v.category !== vendor.category
    );

    return [...sameCat, ...fillers].slice(0, 3);
  }, [vendor]);

  if (!vendor) return <NotFound />;

  const mapsQuery = encodeURIComponent(
    `${vendor.name}, ${vendor.location}`
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const telHref = vendor.phone
    ? `tel:${vendor.phone.replace(/\s/g, "")}`
    : null;

  return (
    <>
      <PageBanner
        title={vendor.name}
        crumb={vendor.category}
        bg={vendor.image}
      />

      {/* ================= HERO ================= */}

      <section className="section vd-hero-sec">
        <div className="container">

          <Reveal>
            <Link
              to="/vendors"
              className="vd-back"
            >
              <ArrowLeft size={16} />
              All Vendors
            </Link>
          </Reveal>

          <div className="vd-hero">
            <Reveal className="vd-hero-copy">
              <span className="vd-cat">
                {vendor.category}
              </span>

              <h1>
                {vendor.name}
              </h1>

              <p className="vd-loc">
                <MapPin size={16} />
                {vendor.location}
              </p>

              <div className="vd-badges">
                {vendor.rating != null && (
                  <span className="vd-badge">
                    <Star size={13} />
                    {vendor.rating} rating
                  </span>
                )}

                <span className="vd-badge">
                  {vendor.reviews > 0
                    ? `${vendor.reviews.toLocaleString()} reviews`
                    : "New listing"}
                </span>

                <span className="vd-badge">
                  <Award size={13} />
                  {vendor.experience} yrs experience
                </span>
              </div>

              <p className="vd-desc">
                {vendor.desc}
              </p>
            </Reveal>

            <Reveal
              delay={120}
              className="vd-hero-img"
            >
              <img
                src={vendor.image}
                alt={vendor.name}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}

      <section className="section alt">
        <div className="container">

          <div className="vd-cols">

            {/* ---------- LEFT ---------- */}

            <div className="vd-main">

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
                      alt={`${vendor.name} — view ${i + 1}`}
                      loading="lazy"
                    />
                  </Reveal>
                ))}
              </div>

              {/* SERVICES */}
              <Reveal>
                <h2 className="vd-h2">
                  Services
                </h2>
              </Reveal>

              <div className="vd-facs">
                {vendor.facilities.map((f) => (
                  <span
                    key={f}
                    className="vd-fac"
                  >
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
                    <b>{vendor.name}</b>
                    {vendor.location}
                  </span>
                  <ArrowRight size={16} />
                </a>
              </Reveal>
            </div>

            {/* ---------- RIGHT / BOOKING CARD ---------- */}

            <aside className="vd-side">
              <div className="vd-book">

                <span className="vd-book-lbl">
                  Starting price
                </span>

                <div className="vd-book-price vdr-price">
                  {vendor.price}
                </div>

                {/* ---------- CONTACT ---------- */}

                <div className="vdr-contact">
                  <span className="vdr-contact-lbl">
                    Contact number
                  </span>

                  {vendor.phone ? (
                    <a
                      href={telHref}
                      className="vdr-contact-num"
                    >
                      {vendor.phone}
                    </a>
                  ) : (
                    <>
                      <span className="vdr-contact-none">
                        <PhoneOff size={14} />
                        Not listed
                      </span>

                      <a
                        href={enquiryLink(vendor)}
                        className="btn btn-line btn-block vdr-enq-btn"
                      >
                        <Mail size={15} />
                        Send Enquiry
                      </a>

                      <p className="vdr-enq-note">
                        No number on our records.
                        Send an enquiry and we
                        will get it for you.
                      </p>
                    </>
                  )}
                </div>

                <ul className="vd-book-list">
                  <li>
                    <Award size={14} />
                    Experience:{" "}
                    <b>
                      {vendor.experience} yrs
                    </b>
                  </li>

                  {vendor.rating != null && (
                    <li>
                      <Star size={14} />
                      Rating:{" "}
                      <b>{vendor.rating}</b>
                    </li>
                  )}

                  <li>
                    <BadgeDollarSign size={14} />
                    {vendor.price}
                  </li>

                  <li>
                    <MapPin size={14} />
                    {vendor.location}
                  </li>
                </ul>

                {vendor.phone ? (
                  <>
                    <a
                      href={telHref}
                      className="btn btn-line btn-block"
                    >
                      <Phone size={16} />
                      Call Now
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
                  <>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-line btn-block"
                    >
                      <MapPin size={16} />
                      Get Directions
                    </a>

                    <a
                      href={enquiryLink(vendor)}
                      className="btn btn-line btn-block"
                    >
                      <Mail size={16} />
                      Send Enquiry
                    </a>
                  </>
                )}

                <Link
                  to={`/booking?type=${encodeURIComponent(
                    vendor.category
                  )}`}
                  className="btn btn-gold btn-block"
                >
                  Book This Vendor
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
                Other{" "}
                <em className="gold-text">
                  Vendors
                </em>
              </>
            }
            sub="Each partner is background-checked, insured and rated by real clients."
          />

          <div className="grid g3">
            {related.map((v, i) => (
              <Reveal
                key={v.id}
                delay={(i % 3) * 100}
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
              className="btn btn-line vd-all"
            >
              Explore All {vendors.length} Vendors
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
