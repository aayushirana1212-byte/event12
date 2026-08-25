import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import DynIcon from "./DynIcon";
import { stats } from "../data/content";

/* Animated counter that starts when scrolled into view */
function useCount(target, run) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;

    let raf = 0;
    const t0 = performance.now();
    const dur = 1900;

    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);

      setN(
        Math.round(
          target * (1 - Math.pow(1 - p, 3))
        )
      );

      if (p < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return n;
}

function StatItem({ icon, value, suffix, label, run, delay }) {
  const n = useCount(value, run);

  return (
    <Reveal delay={delay}>
      <div className="stat">
        <span className="stat-ic">
          <DynIcon name={icon} size={26} />
        </span>

        <b>
          {n.toLocaleString()}
          <i>{suffix}</i>
        </b>

        <span className="stat-lb">{label}</span>
      </div>
    </Reveal>
  );
}

/* Home — statistics counter strip */
export default function Statistics() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="container stats-in">
        {stats.map((s, i) => (
          <StatItem
            key={s.label}
            icon={s.icon}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            run={run}
            delay={i * 110}
          />
        ))}
      </div>
    </section>
  );
}