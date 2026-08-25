import { useState } from "react";

import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import GalleryGrid from "../components/GalleryGrid";
import CTASection from "../components/CTASection";

import {
  galleryItems,
  galleryCategories,
} from "../data/content";

import "../css/gallery.css";

export default function Gallery() {
  const [cat, setCat] = useState("All");

  /* Filter gallery */
  const list = galleryItems.filter(
    (item) =>
      cat === "All" || item.category === cat
  );

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="Golden Gallery"
        crumb="Gallery"
      />

      <section className="section">
        <div className="container">

          {/* Heading */}
          <SectionHeading
            kicker="Our Portfolio"
            title={
              <>
                Celebrations,{" "}
                <em className="gold-text">
                  Captured
                </em>
              </>
            }
            sub="Click any frame to preview it in full glory."
          />

          {/* Category Filter */}
          <Reveal>
            <div
              className="tag-row"
              style={{
                justifyContent: "center",
                marginBottom: 46,
              }}
            >
              {galleryCategories.map((c) => (
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
          </Reveal>

          {/* Gallery */}
          <Reveal key={cat}>
            <GalleryGrid items={list} />
          </Reveal>

        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want Your Event in This Gallery?"
        sub="Let's create a celebration worth framing. Book a consultation with our design atelier today."
      />
    </>
  );
}