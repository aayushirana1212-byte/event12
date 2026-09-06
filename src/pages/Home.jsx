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
import GalleryGrid from "../components/GalleryGrid";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

import { galleryItems, blogs } from "../data/content";

// CSS
import "../css/global.css";
import "../css/home.css";

/* =========================
   HOME PAGE
   ========================= */

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Festival Banner */}
      <FestivalBanner />

      {/* 3 — About Preview */}
      <AboutPreview />

      {/* 4 — Services Preview */}
      <ServicePreview />

      {/* 5 — Featured Events */}
      <FeaturedEvents />

      {/* 6 — Popular Venues */}
      <VenueCards />

      {/* 7 — Top Vendors */}
      <VendorCards />

      {/* 8 — Why Choose Us */}
      <WhyChooseUs />

      {/* 9 — Gallery */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="Golden Gallery"
            title={
              <>
                Moments We've{" "}
                <em className="gold-text">Gilded</em>
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
              View Full Gallery <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 10 — Testimonials */}
      <Testimonials />

      {/* 11 — Latest Blogs */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="The Golden Journal"
            title={
              <>
                Latest Stories &{" "}
                <em className="gold-text">Insights</em>
              </>
            }
            sub="Trends, guides and behind-the-scenes notes from our design atelier."
          />

          <div className="grid g3">
            {blogs.map((blog, index) => (
              <Reveal key={blog.id} delay={index * 120}>
                <article className="card">
                  <div className="imgz bl-img">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="bl-body">
                    <div className="bl-meta">
                      <span>
                        <CalendarDays size={16} />
                        {blog.date}
                      </span>

                      <span>
                        <Clock size={16} />
                        {blog.read}
                      </span>
                    </div>

                    <h3>{blog.title}</h3>

                    <p>{blog.excerpt}</p>

                    <span className="bl-link">
                      Read Story <ArrowRight size={17} />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — CTA */}
      <CTASection />
    </>
  );
}