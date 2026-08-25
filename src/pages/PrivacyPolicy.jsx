import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import "../css/misc.css";

const SECTIONS = [
  {
    t: "1. Information We Collect",
    p: "We collect information you provide directly — your name, email, phone number, event details, guest counts and payment information — when you enquire, register or book with Aurelia Events. We also collect usage data (pages visited, device type, approximate location) to improve our website experience.",
  },
  {
    t: "2. How We Use Your Information",
    p: "Your information is used to prepare quotes, plan and produce your events, process payments, send booking updates, and — with your consent — share inspiration and private offers. We never sell your personal data to third parties.",
  },
  {
    t: "3. Cookies & Tracking",
    p: "We use essential cookies to keep you signed in and remember your preferences, plus optional analytics cookies to understand how our site is used. You may disable non-essential cookies in your browser at any time without affecting core functionality.",
  },
  {
    t: "4. Sharing With Partners",
    p: "To produce your event, relevant details (such as event date, venue and guest count) are shared with the venues and vendors you select. Every partner is bound by confidentiality and data-processing agreements.",
  },
  {
    t: "5. Data Security",
    p: "We apply industry-standard encryption in transit and at rest, role-based access controls, and regular security audits. Payment card details are processed by PCI-DSS compliant providers and are never stored on our servers.",
  },
  {
    t: "6. Data Retention",
    p: "Booking records are retained for 7 years for legal and accounting purposes. Marketing preferences are kept until you unsubscribe. You may request deletion of your personal data at any time (see Section 7).",
  },
  {
    t: "7. Your Rights",
    p: "You may request access, correction, export or deletion of your personal data, and withdraw marketing consent at any time by writing to privacy@aureliaevents.com. We respond to all requests within 30 days.",
  },
  {
    t: "8. Updates to This Policy",
    p: "We may update this policy occasionally. Material changes will be announced by email and on this page with a revised 'last updated' date.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageBanner title="Privacy Policy" crumb="Privacy Policy" />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="legal">
              <p className="legal-up">
                Last updated: January 15, 2026
              </p>

              <p className="legal-intro">
                At Aurelia Events, your privacy is treated with the same
                care as your celebration. This policy explains what we
                collect, why, and the control you always keep.
              </p>

              {SECTIONS.map((s) => (
                <div key={s.t} className="legal-sec">
                  <h2>{s.t}</h2>
                  <p>{s.p}</p>
                </div>
              ))}

              <div className="legal-note">
                Questions about privacy? Write to{" "}
                <b>privacy@aureliaevents.com</b> — our Data Protection
                Officer replies personally.
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}