import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";

import "../css/contact.css";

const INFO = [
  {
    icon: MapPin,
    title: "Visit Our Atelier",
    lines: ["128 Crown Avenue", "INDIA, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
  },
  {
    icon: Mail,
    title: "Write to Us",
    lines: ["hello@aureliaevents.com", "bookings@aureliaevents.com"],
  },
  {
    icon: Clock,
    title: "Studio Hours",
    lines: ["Mon – Sat · 9 AM – 8 PM", "Sunday · By appointment"],
  },
];

export default function Contact() {
  return (
    <>
      {/* Page Banner */}
      <PageBanner title="Contact Us" crumb="Contact" />

      {/* Contact Information */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="grid g4">
            {INFO.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  delay={(index % 4) * 90}
                >
                  <div className="ct-card">
                    <span className="svc-ic">
                      <Icon size={24} />
                    </span>

                    <h3>{item.title}</h3>

                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="section">
        <div className="container">

          <SectionHeading
            kicker="Get in Touch"
            title={
              <>
                Let's Plan Something{" "}
                <em className="gold-text">Golden</em>
              </>
            }
          />

          <div className="ct-grid">

            {/* Contact Form */}
            <Reveal variant="left">
              <ContactForm />
            </Reveal>

            {/* Right Side */}
            <Reveal variant="right" className="ct-side">

              {/* Google Map */}
              <div className="ct-map">

          <iframe
           title="Aurelia Events location map"
           src="https://www.google.com/maps?q=Anand,Gujarat,India&output=embed&z=13"
           loading="lazy"
           style={{
              width: "100%",
              height: "100%",
              border: 0,
              filter: "none",}}
           allowFullScreen />
              </div>

              {/* Consultation Card */}
              <div className="card ct-note">
                <h3>Prefer a Private Consultation?</h3>

                <p>
                  Book a champagne consultation at our atelier — walk through
                  live décor samples, tasting menus and venue films with a
                  senior planner.
                </p>

                <a href="tel:+15551234567" className="btn btn-line btn-sm" style={{ marginTop: 18 }} >
                  <Phone size={14} />
                  Schedule a Visit
                </a>
              </div>

            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}