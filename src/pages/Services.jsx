import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Sparkles } from "lucide-react";

import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import DynIcon from "../components/DynIcon";
import CTASection from "../components/CTASection";

import { services } from "../data/content";

import "../css/services.css";

/* ============ SERVICES PAGE — all 20 services ============ */

export default function Services() {
  const [q, setQ] = useState("");

  const list = services.filter((s) =>
    s.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageBanner
        title="Our Services"
        crumb="Services"
      />

      <section className="section">
        <div className="container">

          {/* Heading + Search */}
          <Reveal>
            <div className="svc-top">

              <div>
                <span className="kicker left">
                  20 Signature Services
                </span>

                <h2 className="sec-title">
                  Everything Your Event Needs,{" "}
                  <em className="gold-text">
                    Under One Roof
                  </em>
                </h2>
              </div>

              <div className="svc-search">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search services..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  aria-label="Search services"
                />
              </div>

            </div>
          </Reveal>

          {/* Services Grid */}
          <div
            className="grid g4"
            style={{ marginTop: 48 }}
          >
            {list.map((s, i) => (
              <Reveal
                key={s.id}
                delay={(i % 4) * 80}
              >
                <div
                  className="card svc-card"
                  style={{ height: "100%" }}
                >

                  {/* Icon */}
                  <span className="svc-ic">
                    <DynIcon
                      name={s.icon}
                      size={26}
                    />
                  </span>

                  {/* Title */}
                  <h3>{s.title}</h3>

                  {/* Description */}
                  <p>{s.desc}</p>

                  {/* Bottom */}
                  <div className="svc-foot">

                    <span className="svc-price">
                      from {s.price}
                    </span>

                    <Link
                      to={`/booking?type=${encodeURIComponent(
                        s.title
                      )}`}
                      className="svc-link"
                    >
                      Book
                      <ArrowRight size={13} />
                    </Link>

                  </div>

                </div>
              </Reveal>
            ))}
          </div>

          {/* No Results */}
          {list.length === 0 && (
            <div className="empty">
              <Search />

              <h3>No services found </h3>

              <p>
                Try a different keyword — or ask us
                for a bespoke service.
              </p>
            </div>
          )}

          {/* Bespoke Service */}
          <Reveal delay={120}>
            <div className="svc-bespoke">

              <div>
                <span className="badge">
                  <Sparkles size={12} />
                  Bespoke Atelier
                </span>

                <h3> Can't find exactly what you need? </h3>
                <p> Our design studio builds fully custom services — from helicopter entries to underwater proposals.</p>

              </div>

              <Link to="/contact" className="btn btn-gold" >
                Request Custom Service
                <ArrowRight />
              </Link>

            </div>
          </Reveal>

        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}