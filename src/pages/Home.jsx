import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import HeroSection from "../components/HeroSection";
import FestivalBanner from "../components/FestivalBanner";
import AboutPreview from "../components/AboutPreview";
import ServicePreview from "../components/ServicePreview";
import FeaturedEvents from "../components/FeatureEvents";
import VenueCards from "../components/VenueCards";
import VendorCards from "../components/VendorCards";
import WhyChooseUs from "../components/WhyChooseUs";
import Statistics from "../components/Statistics";
import GalleryGrid from "../components/GalleryGrid";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import DynIcon from "../components/DynIcon";

import { galleryItems, blogs, bookingSteps } from "../data/content";

// ✅ Global CSS
import "../css/global.css";

// ✅ Home page CSS
import "../css/home.css";

/* ============ HOME — all 15 sections ============ */

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Festival banner slider */}
      <FestivalBanner />

      {/* 3 — About preview */}
      <AboutPreview />

      {/* 4 — Services preview */}
      <ServicePreview />

      {/* 5 — Featured events */}
      <FeaturedEvents />

      {/* 6 — Popular venues */}
      <VenueCards />

      {/* 7 — Top vendors */}
      <VendorCards />

      {/* 8 — Why choose us */}
      <WhyChooseUs />

      {/* 9 — How booking works */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="How It Works"
            title={
              <>
                Booking, <em className="gold-text">Beautifully Simple</em>
              </>
            }
            sub="Four golden steps between you and the celebration of a lifetime."
          />

          <div className="grid g4 steps">
            {bookingSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="step">
                  <span className="step-num">0{i + 1}</span>

                  <span className="step-ic">
                    <DynIcon name={s.icon} size={24} />
                  </span>

                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Statistics */}
      <Statistics />

      {/* 11 — Gallery */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="Golden Gallery"
            title={
              <>
                Moments We've <em className="gold-text">Gilded</em>
              </>
            }
            sub="A glimpse into celebrations we have had the honor of producing."
          />

          <Reveal>
            <GalleryGrid items={galleryItems.slice(0, 8)} />
          </Reveal>

          <Reveal className="center" delay={150}>
            <Link
              to="/gallery"
              className="btn btn-line"
              style={{ marginTop: 48 }}
            >
              View Full Gallery <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 12 — Testimonials */}
      <Testimonials />

      {/* 13 — Latest blogs */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="The Golden Journal"
            title={
              <>
                Latest Stories & <em className="gold-text">Insights</em>
              </>
            }
            sub="Trends, guides and behind-the-scenes notes from our design atelier."
          />

          <div className="grid g3">
            {blogs.map((b, i) => (
              <Reveal key={b.id} delay={i * 120}>
                <article className="card">
                  <div className="imgz bl-img">
                    <img
                      src={b.image}
                      alt={b.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="bl-body">
                    <div className="bl-meta">
                      <span>
                        <CalendarDays /> {b.date}
                      </span>

                      <span>
                        <Clock /> {b.read}
                      </span>
                    </div>

                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>

                    <span className="bl-link">
                      Read Story <ArrowRight />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — CTA */}
      <CTASection />
    </>
  );
}