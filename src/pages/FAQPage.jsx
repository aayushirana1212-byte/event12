import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MessageCircle,
  Phone,
  HelpCircle,
} from "lucide-react";

import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import FAQ from "../components/Faq";

import { faqs } from "../data/content";

import "../css/misc.css";

const CATS = [
  "All",
  "Booking",
  "Services",
  "Payments",
  "Vendors",
];

export default function FAQPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  /* Filter FAQs */
  const list = faqs.filter((f) => {
    const matchCat =
      cat === "All" || f.cat === cat;

    const searchText =
      `${f.q} ${f.a}`.toLowerCase();

    const matchQ =
      searchText.includes(q.toLowerCase());

    return matchCat && matchQ;
  });

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="Frequently Asked Questions"
        crumb="FAQ"
      />

      <section className="section">
        <div className="container">

          {/* Heading */}
          <SectionHeading
            kicker="Help Center"
            title={
              <>
                Answers,{" "}
                <em className="gold-text">
                  Served in Gold
                </em>
              </>
            }
            sub="Search or browse by category — everything about booking, payments and our services."
          />

          {/* Search + Categories */}
          <Reveal>
            <div className="faq-tools">

              {/* Search */}
              <div className="faq-search">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search questions..."
                  value={q}
                  onChange={(e) =>
                    setQ(e.target.value)
                  }
                  aria-label="Search FAQs"
                />
              </div>

              {/* Categories */}
              <div
                className="tag-row"
                style={{
                  justifyContent: "center",
                }}
              >
                {CATS.map((c) => (
                  <button
                    key={c}
                    className={`pill ${
                      cat === c ? "on" : ""
                    }`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

            </div>
          </Reveal>

          {/* FAQ List */}
          {list.length > 0 ? (
            <Reveal key={cat + q}>
              <FAQ items={list} />
            </Reveal>
          ) : (
            <div className="empty">
              <HelpCircle size={40} />

              <h3>No answers found</h3>

              <p>
                Try another keyword — or ask us
                directly below.
              </p>
            </div>
          )}

          {/* Still Need Help */}
          <Reveal delay={120}>
            <div className="faq-help">

              <span className="svc-ic">
                <MessageCircle size={24} />
              </span>

              <div>
                <h3>Still have questions?</h3>

                <p>
                  Our concierge answers within
                  minutes during studio hours.
                </p>
              </div>

              <div className="faq-help-acts">

                <Link
                  to="/contact"
                  className="btn btn-gold btn-sm"
                >
                  Contact Us
                </Link>

                <a
                  href="tel:+15551234567"
                  className="btn btn-line btn-sm"
                >
                  <Phone size={14} />
                  Call Now
                </a>

              </div>

            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}