import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  AlertCircle,
  CalendarCheck,
  Check,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { venues } from "../data/content";
import { addBooking } from "../data/store";
import { useToast } from "../context/ToastContext";

import "../css/booking.css";

const EVENT_TYPES = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Engagement",
  "Baby Shower",
  "Anniversary",
  "Concert",
  "College Fest",
  "Other",
];

const BUDGETS = [
  "Under ₹5,000",
  "₹5,000 - ₹10,000",
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000+",
];

export default function BookingForm() {
  const [params] = useSearchParams();
  const { push } = useToast();

  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    type: params.get("type") || "",
    venue: params.get("venue") || "",
    date: "",
    time: "",
    guests: "",
    budget: "",
    message: "",
  });

  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);

  const set = (key) => (e) => {
    setF((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const selectedVenue = useMemo(
    () => venues.find((v) => String(v.id) === f.venue),
    [f.venue]
  );

  const guests = parseInt(f.guests, 10) || 0;

  const estimate = (selectedVenue ? selectedVenue.price : 0) + guests * 45;

  const validate = () => {
    const e = {};

    if (f.name.trim().length < 3) {
      e.name = "Please enter your full name.";
    }

    if (!/^\S+@\S+\.\S+₹/.test(f.email)) {
      e.email = "Enter a valid email address.";
    }

    if (!/^[\d\s+()-]{7,16}₹/.test(f.phone)) {
      e.phone = "Enter a valid phone number.";
    }

    if (!f.type) {
      e.type = "Select an event type.";
    }

    if (!f.venue) {
      e.venue = "Select a venue.";
    }

    if (!f.date) {
      e.date = "Choose your event date.";
    }

    if (!f.time) {
      e.time = "Choose a time.";
    }

    if (!guests || guests < 10) {
      e.guests = "Minimum 10 guests.";
    }

    if (!f.budget) {
      e.budget = "Select a budget range.";
    }

    setErr(e);

    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();

    if (!validate()) {
      push("error", "Please fix the highlighted fields.");
      return;
    }

    addBooking({
      name: f.name,
      email: f.email,
      phone: f.phone,
      type: f.type,
      venue: selectedVenue ? selectedVenue.name : f.venue,
      date: f.date,
      time: f.time,
      guests,
      budget: f.budget,
      message: f.message,
    });

    setDone(true);

    push(
      "success",
      "Booking request received! Our concierge will call you within 24 hours."
    );

    setF({
      name: "",
      email: "",
      phone: "",
      type: "",
      venue: "",
      date: "",
      time: "",
      guests: "",
      budget: "",
      message: "",
    });

    setErr({});
  };

  const Err = ({ k }) => {
    return err[k] ? (
      <p className="ferr">
        <AlertCircle size={13} />
        {err[k]}
      </p>
    ) : null;
  };

  return (
    <div className="bk-grid">
      {/* Form */}

      <form className="card bk-form" onSubmit={submit} noValidate>
        <h3 className="bk-h">
          <CalendarCheck size={20} />
          Reserve Your Date
        </h3>

        <p className="bk-sub">
          Fields marked <b>*</b> are required. We reply within 24 hours.
        </p>

        <div className="frow">
          <div className="field">
            <label>
              Full Name <b>*</b>
            </label>

            <input
              className="inp"
              placeholder="e.g. Alexandra Reyes"
              value={f.name}
              onChange={set("name")}
            />

            <Err k="name" />
          </div>

          <div className="field">
            <label>
              Email <b>*</b>
            </label>

            <input
              className="inp"
              type="email"
              placeholder="you@email.com"
              value={f.email}
              onChange={set("email")}
            />

            <Err k="email" />
          </div>
        </div>

        <div className="frow">
          <div className="field">
            <label>
              Phone <b>*</b>
            </label>

            <input
              className="inp"
              placeholder="+1 555 000 0000"
              value={f.phone}
              onChange={set("phone")}
            />

            <Err k="phone" />
          </div>

          <div className="field">
            <label>
              Event Type <b>*</b>
            </label>

            <select
              className="inp"
              value={f.type}
              onChange={set("type")}
            >
              <option value="">Select event type</option>

              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <Err k="type" />
          </div>
        </div>

        <div className="field">
          <label>
            Venue <b>*</b>
          </label>

          <select
            className="inp"
            value={f.venue}
            onChange={set("venue")}
          >
            <option value="">Select a venue</option>

            {venues.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {v.location}
              </option>
            ))}
          </select>

          <Err k="venue" />
        </div>

        <div className="frow">
          <div className="field">
            <label>
              Date <b>*</b>
            </label>

            <input
              className="inp"
              type="date"
              value={f.date}
              onChange={set("date")}
              min={new Date().toISOString().split("T")[0]}
            />

            <Err k="date" />
          </div>

          <div className="field">
            <label>
              Time <b>*</b>
            </label>

            <input
              className="inp"
              type="time"
              value={f.time}
              onChange={set("time")}
            />

            <Err k="time" />
          </div>
        </div>

        <div className="frow">
          <div className="field">
            <label>
              Guests <b>*</b>
            </label>

            <input
              className="inp"
              type="number"
              min={10}
              placeholder="e.g. 250"
              value={f.guests}
              onChange={set("guests")}
            />

            <Err k="guests" />
          </div>

          <div className="field">
            <label>
              Budget <b>*</b>
            </label>

            <select
              className="inp"
              value={f.budget}
              onChange={set("budget")}
            >
              <option value="">Select budget range</option>

              {BUDGETS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>

            <Err k="budget" />
          </div>
        </div>

        <div className="field">
          <label>Message</label>

          <textarea
            className="inp"
            placeholder="Tell us about your dream event — theme, colors, must-haves..."
            value={f.message}
            onChange={set("message")}
          />
        </div>

        <button type="submit" className="btn btn-gold btn-block">
          Book Now <CalendarCheck />
        </button>

        {done && (
          <p className="bk-ok">
            <Check size={15} />
            Request sent — check your dashboard for status updates.
          </p>
        )}
      </form>

      {/* Live Summary */}

      <aside className="bk-side">
        <div className="card bk-sum">
          <h3>Booking Summary</h3>

          <div className="bs-row">
            <span>Event Type</span>
            <b>{f.type || "—"}</b>
          </div>

          <div className="bs-row">
            <span>Venue</span>
            <b>{selectedVenue ? selectedVenue.name : "—"}</b>
          </div>

          <div className="bs-row">
            <span>Date & Time</span>

            <b>
              {f.date
                ? `${f.date}${f.time ? " · " + f.time : ""}`
                : "—"}
            </b>
          </div>

          <div className="bs-row">
            <span>Guests</span>
            <b>{guests ? guests.toLocaleString() : "—"}</b>
          </div>

          <div className="bs-row">
            <span>Budget</span>
            <b>{f.budget || "—"}</b>
          </div>

          <div className="bs-total">
            <span>Estimated Total</span>

            <b>
              {estimate > 0
                ? `₹${estimate.toLocaleString()}`
                : "—"}
            </b>
          </div>

          <p className="bs-note">
            Estimate includes venue + standard catering. Final bespoke
            quote follows your consultation.
          </p>
        </div>

        <div className="card bk-assure">
          <h4>The Aurelia Promise</h4>

          <ul>
            {[
              "Free 45-minute design consultation",
              "No hidden fees — itemized quote",
              "Flexible payment milestones",
              "Full refund options up to 90 days",
            ].map((item) => (
              <li key={item}>
                <Check size={14} />
                {item}
              </li>
            ))}
          </ul>

          <div className="bk-call">
            <ShieldCheck size={18} />

            <div>
              <b>Prefer to talk?</b>

              <a href="tel:+15551234567">
                <Phone size={13} />
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}