import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  UtensilsCrossed,
  BedDouble,
  ShieldCheck,
  Wifi,
  MonitorPlay,
  Lightbulb,
  Zap,
  Check,
  ArrowRight,
  Search,
} from "lucide-react";

import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import FAQ from "../components/Faq";
import CTASection from "../components/CTASection";
import Pagination from "../components/Pagination";
import { VenueCard } from "../components/VenueCards";
import DynIcon from "../components/DynIcon";
import {
  venues,
  venueCategories,
  faqs,
  bookingSteps,
} from "../data/content";

import "../css/global.css";
import "../css/venues.css";

/* ---------------- Facilities ---------------- */

const FACILITIES = [
  {
    icon: Car,
    label: "Valet Parking",
  },
  {
    icon: UtensilsCrossed,
    label: "In-house Catering",
  },
  {
    icon: BedDouble,
    label: "Bridal Suites",
  },
  {
    icon: ShieldCheck,
    label: "24/7 Security",
  },
  {
    icon: Wifi,
    label: "High-Speed WiFi",
  },
  {
    icon: MonitorPlay,
    label: "LED Walls & AV",
  },
  {
    icon: Lightbulb,
    label: "Designer Lighting",
  },
  {
    icon: Zap,
    label: "Full Power Backup",
  },
];

/* ---------------- Pricing Tiers ---------------- */

const TIERS = [
  {
    name: "Essential",
    price: "₹2,999",
    per: "/ event",
    feats: [
      "Venue for 6 hours",
      "Standard décor package",
      "Basic lighting & sound",
      "2 event coordinators",
      "Parking assistance",
    ],
    pop: false,
  },
  {
    name: "Signature",
    price: "₹5,999",
    per: "/ event",
    feats: [
      "Venue for 12 hours",
      "Premium themed décor",
      "Full AV + stage setup",
      "5-person production crew",
      "Bridal suite access",
      "In-house catering credit",
    ],
    pop: true,
  },
  {
    name: "Royal",
    price: "₹12,999",
    per: "/ event",
    feats: [
      "Full-day exclusive buyout",
      "Bespoke luxury décor",
      "Concert-grade production",
      "Dedicated event director",
      "VIP guest concierge",
      "Fireworks & special effects",
    ],
    pop: false,
  },
];

/* ============ VENUES PAGE ============ */

export default function Venues() {
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const PER_PAGE = 9;

  const filtered = useMemo(() => {
    return venues.filter((v) => {
      const categoryMatch = cat === "All" || v.category === cat;

      const q = search.trim().toLowerCase();

      const searchMatch =
        v.name?.toLowerCase().includes(q) ||
        v.location?.toLowerCase().includes(q) ||
        v.category?.toLowerCase().includes(q);

      return categoryMatch && searchMatch;
    });
  }, [cat, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const pageItems = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <>
      <PageBanner
        title="Royal Venues"
        crumb="Venues"
      />

      {/* ================= CATEGORY FILTER + CARDS ================= */}

      <section className="section">
        <div className="container">

          <SectionHeading
            kicker="Venue Categories"
            title={
              <>
                Find the Stage That{" "}
                <em className="gold-text">
                  Fits Your Story
                </em>
              </>
            }
            sub="Filter by style — every venue is personally inspected and production-certified by our team."
          />

          {/* Search */}
          <Reveal>
            <div
              className="svc-search"
              style={{
                maxWidth: "420px",
                margin: "0 auto 30px",
              }}
            >
              <Search size={16} />

              <input
                type="text"
                placeholder="Search venues or areas..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                aria-label="Search venues"
              />
            </div>
          </Reveal>

          <Reveal>
            <div
              className="tag-row"
              style={{
                justifyContent: "center",
                marginBottom: 46,
              }}
            >
              {venueCategories.map((c) => (
                <button
                  key={c}
                  className={`pill ${
                    cat === c ? "on" : ""
                  }`}
                  onClick={() => {
                    setCat(c);
                    setPage(1);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {pageItems.length > 0 ? (
            <div className="grid g3">
              {pageItems.map((v, i) => (
                <Reveal
                  key={v.id}
                  delay={(i % 3) * 100}
                >
                  <VenueCard v={v} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty">
              <Search size={32} />
              <h3>No venues found</h3>
              <p>
                Try another venue name, area or category.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              page={page}
              total={totalPages}
              onChange={setPage}
            />
          )}

        </div>
      </section>

      {/* ================= FACILITIES ================= */}

      <section className="section alt">
        <div className="container">

          <SectionHeading
            kicker="Standard Facilities"
            title={
              <>
                Every Venue,{" "}
                <em className="gold-text">
                  Fully Equipped
                </em>
              </>
            }
          />

          <div className="grid g4 facilities-grid">
            {FACILITIES.map((f, i) => {
              const Icon = f.icon;

              return (
                <Reveal
                  key={f.label}
                  delay={(i % 4) * 90}
                >
                  <div className="facil">
                    <span className="svc-ic">
                      <Icon size={24} />
                    </span>

                    <span>{f.label}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= PRICING ================= */}

      <section className="section">
        <div className="container">

          <SectionHeading
            kicker="Venue Packages"
            title={
              <>
                Transparent{" "}
                <em className="gold-text">
                  Pricing
                </em>
              </>
            }
            sub="Three clear tiers — every quote itemized, zero hidden charges."
          />

          <div className="grid g3 tiers">

            {TIERS.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 120}
              >
                <div
                  className={`tier ${
                    t.pop ? "pop" : ""
                  }`}
                >

                  {t.pop && (
                    <span className="tier-badge">
                      Most Loved
                    </span>
                  )}

                  <h3>{t.name}</h3>

                  <div className="tier-price">
                    {t.price}{" "}
                    <small>{t.per}</small>
                  </div>

                  <ul>
                    {t.feats.map((f) => (
                      <li key={f}>
                        <Check size={14} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/booking"
                    className={`btn ${
                      t.pop
                        ? "btn-gold"
                        : "btn-line"
                    } btn-block`}
                  >
                    Choose {t.name}
                  </Link>

                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* ================= BOOKING PROCESS ================= */}

      <section className="section alt">
        <div className="container">

          <SectionHeading
            kicker="Booking Process"
            title={
              <>
                Reserved in{" "}
                <em className="gold-text">
                  Four Steps
                </em>
              </>
            }
          />

          <div className="grid g4">

            {bookingSteps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 110}
              >
                <div className="step">

                  <span className="step-num">
                    0{i + 1}
                  </span>

                  <span className="step-ic">
                    <DynIcon
                      name={s.icon}
                      size={24}
                    />
                  </span>

                  <h3>{s.title}</h3>

                  <p>{s.text}</p>

                </div>
              </Reveal>
            ))}

          </div>

          <Reveal
            className="center"
            delay={150}
          >
            <Link
              to="/booking"
              className="btn btn-gold"
              style={{ marginTop: 48 }}
            >
              Book a Venue Tour
              <ArrowRight />
            </Link>
          </Reveal>

        </div>
      </section>

      {/* ================= VENUE FAQ ================= */}

      <section className="section">
        <div className="container">

          <SectionHeading
            kicker="Venue FAQs"
            title={
              <>
                Good to{" "}
                <em className="gold-text">
                  Know
                </em>
              </>
            }
          />

          <Reveal>
            <FAQ items={faqs.slice(0, 4)} />
          </Reveal>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <CTASection />
    </>
  );
}