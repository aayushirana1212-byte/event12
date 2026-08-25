import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { festivalSlides } from "../data/content";

/* Auto-playing festival / seasonal offer banner slider */

export default function FestivalBanner() {
  const [idx, setIdx] = useState(0);
  const total = festivalSlides.length;

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % total);
    }, 6000);

    return () => clearInterval(t);
  }, [total]);

  return (
    <section
      className="fest"
      id="festivals"
      aria-label="Seasonal offers"
    >
      {festivalSlides.map((s, i) => (
        <div
          key={i}
          className={`fest-slide ${
            i === idx ? "on" : ""
          }`}
          style={{
            backgroundImage: `url(${s.image})`,
          }}
        >
          <div className="fest-ov" />

          <div className="container fest-in">
            <div className="fest-card">
              <span className="badge">
                {s.tag}
              </span>

              <h3>{s.title}</h3>

              <p>{s.text}</p>

              <Link
                to="/booking"
                className="btn btn-gold btn-sm"
              >
                {s.cta}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="fest-nav">
        <button
          onClick={() =>
            setIdx(
              (idx - 1 + total) % total
            )
          }
          aria-label="Previous offer"
        >
          <ChevronLeft />
        </button>

        <div className="fest-dots">
          {festivalSlides.map((_, i) => (
            <button
              key={i}
              className={i === idx ? "on" : ""}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setIdx((idx + 1) % total)
          }
          aria-label="Next offer"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}