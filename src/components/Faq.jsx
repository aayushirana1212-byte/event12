import { useState } from "react";
import { Plus } from "lucide-react";
import "../css/faq.css";

/* Reusable gold accordion */

export default function FAQ({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="fq">
      {items.map((f, i) => (
        <div
          key={i}
          className={`fq-item ${open === i ? "open" : ""}`}
        >
          <button
            className="fq-q"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{f.q}</span>
            <Plus size={18} />
          </button>

          <div className="fq-a">
            <div className="fq-a-in">
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}