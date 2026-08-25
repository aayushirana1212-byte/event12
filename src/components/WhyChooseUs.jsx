import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import DynIcon from "./DynIcon";
import { whyUs } from "../data/content";

/* "Why Choose Us" — used on Home and About */
export default function WhyChooseUs() {
  return (
    <section className="section alt">
      <div className="container">

        <SectionHeading
          kicker="Why Choose Us"
          title={
            <>
              The Aurelia{" "}
              <em className="gold-text">
                Difference
              </em>
            </>
          }
          sub="Six promises we make to every client — and keep, every single time."
        />

        <div className="grid g3">
          {whyUs.map((w, i) => (
            <Reveal
              key={w.title}
              delay={(i % 3) * 110}
            >
              <div className="why-card">

                <span className="why-ic">
                  <DynIcon
                    name={w.icon}
                    size={24}
                  />
                </span>

                <h3>{w.title}</h3>

                <p>{w.text}</p>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}