import { ChevronLeft, ChevronRight } from "lucide-react";

/* Reusable pagination bar */
export default function Pagination({ page, total, onChange }) {
  if (total <= 1) return null;

  return (
    <div className="pgn">
      {/* Previous */}
      <button
        className="pg-b"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          className={`pg-b ${n === page ? "on" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      {/* Next */}
      <button
        className="pg-b"
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight />
      </button>
    </div>
  );
}