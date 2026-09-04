import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { festivalSlides } from "../data/content";
import { festivalDates } from "../data/festivalDates";

export default function FestivalBanner() {
  const getInitialIndex = () => {
    const today = new Date();
    const year = today.getFullYear();

    const datesForYear = festivalDates[year] || {};

    const activeIndex = festivalSlides.findIndex((festival) => {
      const dates = datesForYear[festival.id];

      if (!dates) return false;

      const start = new Date(`${dates.start}T00:00:00`);
      const end = new Date(`${dates.end}T23:59:59`);

      return today >= start && today <= end;
    });

    return activeIndex >= 0 ? activeIndex : 0;
  };

  const [idx, setIdx] = useState(getInitialIndex);

  const total = festivalSlides.length;

  // Check festival every minute
  useEffect(() => {
    const checkFestival = () => {
      const newIndex = getInitialIndex();
      setIdx(newIndex);
    };

    const timer = setInterval(checkFestival, 60000);

    return () => clearInterval(timer);
  }, []);

  // Auto-playing slider
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
          key={s.id || i}
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
          {festivalSlides.map((festival, i) => (
            <button
              key={festival.id || i}
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