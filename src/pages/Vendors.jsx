import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Search } from "lucide-react";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Pagination from "../components/Pagination";
import CTASection from "../components/CTASection";
import { VendorCard } from "../components/VendorCards";
import { vendors, vendorCategories } from "../data/content";
import "../css/vendors.css";

/* ============ VENDORS PAGE ============ */
export default function Vendors() {
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const PER_PAGE = 6;

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const categoryMatch = cat === "All" || v.category === cat;

      const searchMatch =
        v.name?.toLowerCase().includes(search.toLowerCase()) ||
        v.category?.toLowerCase().includes(search.toLowerCase());

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
      <PageBanner title="Elite Vendors" crumb="Vendors" />

      <section className="section">
        <div className="container">

          {/* Heading */}
          <SectionHeading
            kicker="Vendor Categories"
            title={
              <>
                Hand-Picked{" "}
                <em className="gold-text">Masters of Craft</em>
              </>
            }
            sub="Every vendor is background-checked, insured and rated by real Aurelia clients."
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
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                aria-label="Search vendors"
              />
            </div>
          </Reveal>

          {/* Categories */}
          <Reveal>
            <div
              className="tag-row"
              style={{
                justifyContent: "center",
                marginBottom: 46,
              }}
            >
              {vendorCategories.map((c) => (
                <button
                  key={c}
                  className={`pill ${cat === c ? "on" : ""}`}
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

          {/* Vendors */}
          {pageItems.length > 0 ? (
            <div className="grid g3">
              {pageItems.map((v, i) => (
                <Reveal
                  key={v.id}
                  delay={(i % 3) * 100}
                >
                  <VendorCard v={v} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty">
              <Search size={32} />
              <h3>No vendors found</h3>
              <p>
                Try another vendor name or select a different category.
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

          {/* Become a Vendor */}
          <Reveal delay={120}>
            <div className="vd-join">
              <div>
                <span className="badge">
                  <Handshake size={12} /> Partner With Us
                </span>

                <h3>Are you an exceptional vendor?</h3>

                <p>
                  Join the Aurelia elite network and get booked by clients
                  who value craft over cost.
                </p>
              </div>

              <Link
                to="/contact"
                className="btn btn-gold"
              >
                Apply as Vendor <ArrowRight />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      <CTASection />
    </>
  );
}