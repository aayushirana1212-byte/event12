import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import "../css/misc.css";

const SECTIONS = [
  {
    t: "1. Acceptance of Terms",
    p: "By accessing the Aurelia Events website or booking our services, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use our services.",
  },
  {
    t: "2. Our Services",
    p: "Aurelia Events provides event planning, venue booking, vendor coordination, design and production services. Specific deliverables, timelines and pricing are defined in the individual event proposal signed for each booking.",
  },
  {
    t: "3. Bookings & Payments",
    p: "A booking is confirmed only after the signed proposal and initial deposit (typically 30%) are received. Payment milestones follow the schedule in your proposal. Late payments may pause production work until settled.",
  },
  {
    t: "4. Cancellations & Refunds",
    p: "Client cancellations 90+ days before the event receive a full refund minus a 10% administrative fee. 30–89 days: 50% refund. Within 30 days, payments convert to an 18-month credit. Force majeure events are rescheduled at no penalty.",
  },
  {
    t: "5. Client Responsibilities",
    p: "Clients agree to provide accurate event information, timely approvals, and a safe working environment for our crew and vendors. Delays caused by late approvals may shift deliverable dates.",
  },
  {
    t: "6. Vendor & Venue Terms",
    p: "Third-party vendors and venues operate under their own contracts in addition to ours. While we carefully vet every partner, their independent terms apply to their specific services.",
  },
  {
    t: "7. Liability",
    p: "Our total liability for any claim is limited to the fees paid for the relevant booking. We are not liable for indirect losses, weather disruptions, or circumstances beyond reasonable control.",
  },
  {
    t: "8. Intellectual Property",
    p: "Design concepts, mood boards and proposals remain Aurelia Events' intellectual property until the booking is confirmed. Event photography may be used in our portfolio unless you opt out in writing.",
  },
  {
    t: "9. Governing Law",
    p: "These terms are governed by the laws of the State of New York. Disputes will first be addressed through good-faith mediation before any court proceedings.",
  },
];

export default function Terms() {
  return (
    <>
      <PageBanner title="Terms & Conditions" crumb="Terms" />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="legal">
              <p className="legal-up">
                Last updated: January 15, 2026
              </p>

              <p className="legal-intro">
                Clear terms make golden partnerships. Please read these
                conditions carefully — they protect your celebration as much
                as they guide our craft.
              </p>

              {SECTIONS.map((s) => (
                <div key={s.t} className="legal-sec">
                  <h2>{s.t}</h2>
                  <p>{s.p}</p>
                </div>
              ))}

              <div className="legal-note">
                Questions about these terms? Contact{" "}
                <b>legal@aureliaevents.com</b> or call +1 (555) 123-4567.
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}