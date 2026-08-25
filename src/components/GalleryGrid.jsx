import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

import "../css/gallery.css";

/* Masonry-style gallery grid with lightbox preview */

export default function GalleryGrid({ items }) {
  const [lb, setLb] = useState(null);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lb === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setLb(null);
      }

      if (e.key === "ArrowRight") {
        setLb((lb + 1) % items.length);
      }

      if (e.key === "ArrowLeft") {
        setLb(
          (lb - 1 + items.length) % items.length
        );
      }
    };

    window.addEventListener("keydown", onKey);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lb, items.length]);

  return (
    <>
      <div className="gal-grid">
        {items.map((g, i) => (
          <figure
            key={g.id}
            className={`gal-item ${
              g.tall ? "tall" : ""
            }`}
            onClick={() => setLb(i)}
          >
            <img
              src={g.image}
              alt={g.title}
              loading="lazy"
            />

            <figcaption className="gal-ov">
              <span className="gal-zoom">
                <ZoomIn size={20} />
              </span>

              <div>
                <span>{g.category}</span>
                <h4>{g.title}</h4>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {lb !== null && items[lb] && (
        <div
          className="lbx"
          onClick={() => setLb(null)}
        >
          <button
            className="lbx-btn lbx-x"
            onClick={() => setLb(null)}
            aria-label="Close"
          >
            <X />
          </button>

          <button
            className="lbx-btn lbx-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLb(
                (lb - 1 + items.length) %
                  items.length
              );
            }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          <img
            src={items[lb].image}
            alt={items[lb].title}
            onClick={(e) =>
              e.stopPropagation()
            }
          />

          <div className="lbx-cap">
            <span>{items[lb].category}</span>
            <h4>{items[lb].title}</h4>
          </div>

          <button
            className="lbx-btn lbx-next"
            onClick={(e) => {
              e.stopPropagation();
              setLb(
                (lb + 1) % items.length
              );
            }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
}