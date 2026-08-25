import Reveal from "./Reveal";

/* Reusable centered/left section heading with gold kicker */
export default function SectionHeading({
  kicker,
  title,
  sub,
  center = true,
}) {
  return (
    <Reveal>
      <div className={`sec-head ${center ? "center" : ""}`}>
        <span className={`kicker ${center ? "" : "left"}`}>
          {kicker}
        </span>

        <h2 className="sec-title">
          {title}
        </h2>

        {sub && (
          <p className="sec-sub">
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}