import { useEffect, useRef } from "react";

/* Scroll-reveal wrapper (lightweight AOS alternative) */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rv rv-${variant} ${className}`}
      style={{
        "--rvd": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}