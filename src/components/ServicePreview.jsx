import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import DynIcon from "./DynIcon";

import { services } from "../data/content";

/* Home — preview of 8 signature services */
export default function ServicePreview() {
  return (
    <section className="section alt">
      <div className="container">

        <SectionHeading
          kicker="What We Do"
          title={
            <>
              Signature Services,{" "}
              <em className="gold-text">
                Golden Standards
              </em>
            </>
          }
          sub="Twenty white-glove services under one roof — so you never juggle vendors, timelines or budgets alone."
        />

        <div className="grid g4">
          {services.slice(0, 8).map((s, i) => (
            <Reveal
              key={s.id}
              delay={(i % 4) * 100}
            >
              <Link
                to="/services"
                className="card svc-card"
              >
                <span className="svc-ic">
                  <DynIcon
                    name={s.icon}
                    size={26}
                  />
                </span>

                <h3>{s.title}</h3>

                <p>{s.desc}</p>

                <div className="svc-foot">
                  <span className="svc-price">
                    from {s.price}
                  </span>

                  <span className="svc-link">
                    Details <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal
          className="center"
          delay={200}
        >
          <Link
            to="/services"
            className="btn btn-gold"
            style={{ marginTop: 48 }}
          >
            View All 20 Services <ArrowRight />
          </Link>
        </Reveal>

      </div>
    </section>
  );
}