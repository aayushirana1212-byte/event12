import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import BookingForm from "../components/BookingForm";
import DynIcon from "../components/DynIcon";
import { bookingSteps } from "../data/content";

// ============ BOOKING PAGE ============
export default function Booking() {
  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="Book Your Event"
        crumb="Booking"
      />

      {/* Booking Steps */}
      <section
        className="section"
        style={{ paddingBottom: 0 }}
      >
        <div className="container">

          <div className="grid g4">

            {bookingSteps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 100}
              >
                <div
                  className="step"
                  style={{
                    padding: "28px 22px",
                  }}
                >

                  {/* Step Number */}
                  <span
                    className="step-num"
                    style={{
                      fontSize: 42,
                    }}
                  >
                    0{index + 1}
                  </span>

                  {/* Step Icon */}
                  <span
                    className="step-ic"
                    style={{
                      width: 48,
                      height: 48,
                      marginBottom: 14,
                    }}
                  >
                    <DynIcon
                      name={step.icon}
                      size={20}
                    />
                  </span>

                  {/* Step Title */}
                  <h3
                    style={{
                      fontSize: 17,
                    }}
                  >
                    {step.title}
                  </h3>

                </div>
              </Reveal>
            ))}

          </div>

        </div>
      </section>

      {/* Booking Form */}
      <section className="section">

        <div className="container">

          <SectionHeading
            kicker="Reservation Form"
            title={
              <>
                Tell Us About Your{" "}
                <em className="gold-text">
                  Celebration
                </em>
              </>
            }
            sub="Complete the form and watch your live estimate build on the right."
          />

          <Reveal>
            <BookingForm />
          </Reveal>

        </div>

      </section>
    </>
  );
}