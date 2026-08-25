import { useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { testimonials } from "../data/content";

/* Home — auto-playing testimonial slider */
export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    if (total === 0) return;

    const t = setInterval(() => {
      setIdx((i) => (i + 1) % total);
    }, 7000);

    return () => clearInterval(t);
  }, [total]);

  if (total === 0) {
    return null;
  }

  const tm = testimonials[idx];

  return (
    <section className="section alt tst">
      <div className="container">

        <SectionHeading
          kicker="Testimonials"
          title={
            <>
              Words Written in{" "}
              <em className="gold-text">Gold</em>
            </>
          }
        />

        <Reveal>
          <div className="tst-box" key={tm.id}>
            <Quote className="tst-quote" />

            <p className="tst-text">
              "{tm.text}"
            </p>

            <div
              className="stars"
              style={{ justifyContent: "center" }}
            >
              {Array.from({ length: tm.rating }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            <div className="tst-person">
              <img
                src={tm.avatar}
                alt={tm.name}
              />

              <div>
                <b>{tm.name}</b>
                <span>{tm.role}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="tst-nav">

          <button
            onClick={() =>
              setIdx((idx - 1 + total) % total)
            }
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          <div className="tst-dots">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                className={i === idx ? "on" : ""}
                onClick={() => setIdx(i)}
                aria-label={`Testimonial ${i + 1}`}
              >
                <img
                  src={t.avatar}
                  alt=""
                />
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setIdx((idx + 1) % total)
            }
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>

        </div>
      </div>
    </section>
  );
}