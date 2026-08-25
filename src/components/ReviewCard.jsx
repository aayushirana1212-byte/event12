import { Quote, Star } from "lucide-react";

/* Reusable review / testimonial card */
export default function ReviewCard({ r }) {
  return (
    <article className="card rw-card">
      <Quote />

      <div className="rw-head">
        <img src={r.avatar} alt={r.name} />

        <div>
          <h4>{r.name}</h4>
          <small>{r.event}</small>
        </div>
      </div>

      <span className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < r.rating ? "" : "off"}
          />
        ))}
      </span>

      <p>"{r.text}"</p>

      <div className="rw-date">
        {r.date}
      </div>
    </article>
  );
}