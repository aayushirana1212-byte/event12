import { useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import { useToast } from "../context/ToastContext";

/* Contact form with validation + toast feedback */

export default function ContactForm() {
  const { push } = useToast();

  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [err, setErr] = useState({});

  const set = (key) => (e) => {
    setF((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const v = {};

    if (f.name.trim().length < 3) {
      v.name = "Please enter your name.";
    }

    // Fixed email validation regex
    if (!/^\S+@\S+\.\S+$/.test(f.email)) {
      v.email = "Enter a valid email.";
    }

    if (!f.subject) {
      v.subject = "Choose a subject.";
    }

    if (f.message.trim().length < 10) {
      v.message = "Message must be at least 10 characters.";
    }

    setErr(v);

    if (Object.keys(v).length > 0) {
      push("error", "Please fix the highlighted fields.");
      return;
    }

    push(
      "success",
      "Message sent! Our team replies within one business day."
    );

    setF({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setErr({});
  };

  return (
    <form className="card ct-form" onSubmit={submit} noValidate>
      <h3>Send Us a Message</h3>

      <p className="ct-form-sub">
        We answer every note personally — usually within hours.
      </p>

      {/* Name + Email */}
      <div className="frow">
        <div className="field">
          <label>
            Your Name <b>*</b>
          </label>

          <input
            className="inp"
            placeholder="Full name"
            value={f.name}
            onChange={set("name")}
          />

          {err.name && (
            <p className="ferr">
              <AlertCircle size={13} />
              {err.name}
            </p>
          )}
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

          {err.email && (
            <p className="ferr">
              <AlertCircle size={13} />
              {err.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="frow">
        <div className="field">
          <label>Phone</label>

          <input
            className="inp"
            placeholder="+1 555 000 0000"
            value={f.phone}
            onChange={set("phone")}
          />
        </div>

        <div className="field">
          <label>
            Subject <b>*</b>
          </label>

          <select
            className="inp"
            value={f.subject}
            onChange={set("subject")}
          >
            <option value="">Select subject</option>

            {[
              "Event Booking",
              "Venue Partnership",
              "Vendor Registration",
              "Corporate Enquiry",
              "Feedback",
              "Other",
            ].map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          {err.subject && (
            <p className="ferr">
              <AlertCircle size={13} />
              {err.subject}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="field">
        <label>
          Message <b>*</b>
        </label>

        <textarea
          className="inp"
          placeholder="How can we make your celebration golden?"
          value={f.message}
          onChange={set("message")}
        />

        {err.message && (
          <p className="ferr">
            <AlertCircle size={13} />
            {err.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button className="btn btn-gold btn-block" type="submit">
        Send Message
        <Send />
      </button>
    </form>
  );
}