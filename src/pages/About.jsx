import { Link } from "react-router-dom";
import { Target, Eye, Gem, ArrowRight, Mail, Quote } from "lucide-react";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import { IMG, team, timeline } from "../data/content";
import "../css/about.css";

const MV = [
  { icon: Target, title: "Our Mission", text: "To transform every celebration into a work of art — produced with precision, wrapped in luxury, and remembered for generations." },
  { icon: Eye, title: "Our Vision", text: "To be the world's most trusted name in luxury events — the first word spoken whenever a moment truly matters." },
  { icon: Gem, title: "Our Values", text: "Obsession with detail, honesty in pricing, respect for tradition, and the courage to create what has never been seen before." },
];

/* ============ ABOUT PAGE ============ */
export default function About() {
  return (
    <>
      <PageBanner title="About Aurelia" crumb="About" />

      {/* Company introduction */}
      <section className="section">
        <div className="container ab-intro">
          <Reveal variant="left">
            <div className="ab-frame">
              <img src={IMG.story} alt="Grand ballroom produced by Aurelia Events" />
              <span className="ab-since">Est. 2012</span>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="kicker left">Our House</span>
            <h2 className="sec-title">The House of <em className="gold-text">Golden Moments</em></h2>
            <p className="sec-sub">
              Aurelia Events began with a single wedding and a stubborn belief: that a celebration
              should feel like a masterpiece. Fourteen years later, our atelier of planners, designers,
              engineers and artists has produced more than 2,500 events — each one treated like our first.
            </p>
            <p className="sec-sub">
              From royal palace weddings to stadium concerts, we bring together venues, vendors,
              technology and artistry under one roof — so our clients can simply arrive, and shine.
            </p>
            <Link to="/booking" className="btn btn-gold" style={{ marginTop: 30 }}>Start Your Story <ArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section alt">
        <div className="container">
          <SectionHeading kicker="What Drives Us" title={<>Mission, Vision & <em className="gold-text">Values</em></>} />
          <div className="grid g3">
            {MV.map((m, i) => (
              <Reveal key={m.title} delay={i * 120}>
                <div className="mv-card">
                  <span className="svc-ic"><m.icon size={26} /></span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="section">
        <div className="container ab-intro rev">
          <Reveal variant="right" className="order-2">
            <div className="ab-frame">
              <img src={IMG.aboutMain} alt="Candlelit dinner setting" />
            </div>
          </Reveal>
          <Reveal variant="left" className="order-1">
            <span className="kicker left">Our Story</span>
            <h2 className="sec-title">From One Candle to <em className="gold-text">a Thousand Chandeliers</em></h2>
            <p className="sec-sub">
              In 2012, founder Adrian Vale designed his sister's wedding in a borrowed ballroom with
              a borrowed budget — and guests called it "the most beautiful evening of their lives."
              Word travelled. So did we.
            </p>
            <blockquote className="ab-quote">
              <Quote size={20} />
              "Luxury is not a price tag. It is the feeling that every single detail was made for you."
              <b>— Adrian Vale, Founder</b>
            </blockquote>
            <p className="sec-sub">
              Today Aurelia operates in five cities with a destination desk spanning three continents —
              yet every event still receives the same founding obsession: one family, one night, one golden memory.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section alt">
        <div className="container">
          <SectionHeading kicker="Milestones" title={<>The Golden <em className="gold-text">Journey</em></>} />
          <div className="tline">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 90}>
                <div className="tl-item">
                  <span className="tl-dot" />
                  <span className="tl-year">{t.year}</span>
                  <div className="tl-card">
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="The Atelier"
            title={<>Meet the <em className="gold-text">Master Craftsmen</em></>}
            sub="Planners, designers and producers who treat your celebration like their own."
          />
          <div className="grid g4">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={(i % 4) * 100}>
                <div className="tm card">
                  <div className="imgz tm-img">
                    <img src={t.image} alt={t.name} />
                    <span className="tm-mail"><Mail size={16} /></span>
                  </div>
                  <div className="tm-body">
                    <h3>{t.name}</h3>
                    <span>{t.role}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us + CTA */}
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
