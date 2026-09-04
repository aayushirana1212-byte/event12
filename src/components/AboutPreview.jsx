import { Link } from "react-router-dom";
import { Check, ArrowRight, Award } from "lucide-react";
import Reveal from "./Reveal";
import { IMG } from "../data/content";

const POINTS = [
  "Dedicated personal event director",
  "1,200+ vetted elite vendor network",
  "Transparent, itemized pricing",
  "24/7 on-day production control room",
];

/* Home — About preview section */
export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container abp">
        <Reveal variant="left" className="abp-media">
          <div className="abp-imgs">
            <img className="abp-main" src={IMG.aboutMain} alt="Luxury event ballroom designed by Aurelia" />
            <img className="abp-small" src={IMG.aboutSmall} alt="Golden candelabra detail" />
            <div className="abp-badge">
              <Award size={26} />
        
            </div>
          </div>
        </Reveal>

        <Reveal variant="right" className="abp-text">
          <span className="kicker left">About Aurelia</span>
          <h2 className="sec-title">We Don't Plan Events.<br /><em className="gold-text">We Compose Legacies.</em></h2>
          <p className="sec-sub">
            Since 2012, Aurelia Events has produced over 2,500 celebrations across the country —
            from intimate candlelit dinners to 20,000-guest festivals. Our atelier of planners,
            designers and producers treats every brief like a masterpiece in the making.
          </p>
          <ul className="abp-list">
            {POINTS.map((p) => (
              <li key={p}><span className="abp-check"><Check size={13} /></span> {p}</li>
            ))}
          </ul>
          <div className="abp-foot">
            <Link to="/about" className="btn btn-line">Discover Our Story <ArrowRight /></Link>
            <div className="abp-sign">
              <b>Adrian Vale</b>
              <span>Founder & CEO</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
