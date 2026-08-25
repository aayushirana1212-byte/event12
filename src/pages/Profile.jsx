import { useState } from "react";
import { Crown, Save, ShieldCheck, AlertCircle } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../css/misc.css";

/* ============ PROFILE PAGE ============ */
export default function Profile() {
  const { user, updateUser } = useAuth();
  const { push } = useToast();

  const u = user || {
    name: "Guest Member",
    email: "guest@aurelia.com",
    phone: "",
  };

  const [f, setF] = useState({
    name: u.name,
    email: u.email,
    phone: u.phone || "",
    city: "New York",
    bio: "",
  });

  const [pw, setPw] = useState({
    current: "",
    next: "",
  });

  const [pwErr, setPwErr] = useState("");

  const [prefs, setPrefs] = useState({
    email: true,
    sms: true,
    whatsapp: false,
  });

  const saveProfile = (e) => {
    e.preventDefault();

    if (f.name.trim().length < 3) {
      return push(
        "error",
        "Name must be at least 3 characters."
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(f.email)) {
      return push(
        "error",
        "Enter a valid email."
      );
    }

    updateUser({
      name: f.name,
      email: f.email,
      phone: f.phone,
    });

    push(
      "success",
      "Profile updated beautifully."
    );
  };

  const savePassword = (e) => {
    e.preventDefault();

    if (pw.current.length < 6) {
      return setPwErr(
        "Current password is required (6+ chars)."
      );
    }

    if (pw.next.length < 6) {
      return setPwErr(
        "New password must be 6+ characters."
      );
    }

    setPwErr("");

    setPw({
      current: "",
      next: "",
    });

    push(
      "success",
      "Password changed successfully."
    );
  };

  return (
    <>
      <PageBanner
        title="My Profile"
        crumb="Profile"
      />

      <section className="section">
        <div className="container pf-grid">

          {/* LEFT — Identity Card */}
          <Reveal variant="left">
            <div className="panel pf-me">

              <span className="pf-av">
                {u.name.charAt(0).toUpperCase()}
              </span>

              <h3>{u.name}</h3>

              <span className="badge">
                <Crown size={11} />
                Golden Circle
              </span>

              <div className="pf-rows">

                <div>
                  <span>Email</span>
                  <b>{u.email}</b>
                </div>

                <div>
                  <span>Phone</span>
                  <b>{u.phone || "—"}</b>
                </div>

                <div>
                  <span>City</span>
                  <b>{f.city}</b>
                </div>

                <div>
                  <span>Member Since</span>
                  <b>January 2026</b>
                </div>

              </div>
            </div>
          </Reveal>

          {/* RIGHT — Editable Panels */}
          <div className="dcol">

            {/* Personal Information */}
            <Reveal variant="right">
              <form
                className="panel"
                onSubmit={saveProfile}
              >
                <div className="panel-h">
                  <h3>Personal Information</h3>
                </div>

                <div className="frow">

                  <div className="field">
                    <label>Full Name</label>

                    <input
                      className="inp"
                      value={f.name}
                      onChange={(e) =>
                        setF({
                          ...f,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Email</label>

                    <input
                      className="inp"
                      value={f.email}
                      onChange={(e) =>
                        setF({
                          ...f,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                </div>

                <div className="frow">

                  <div className="field">
                    <label>Phone</label>

                    <input
                      className="inp"
                      value={f.phone}
                      onChange={(e) =>
                        setF({
                          ...f,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+1 555 000 0000"
                    />
                  </div>

                  <div className="field">
                    <label>City</label>

                    <input
                      className="inp"
                      value={f.city}
                      onChange={(e) =>
                        setF({
                          ...f,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>

                </div>

                <div className="field">
                  <label>Bio</label>

                  <textarea
                    className="inp"
                    placeholder="A line about you and the celebrations you love..."
                    value={f.bio}
                    onChange={(e) =>
                      setF({
                        ...f,
                        bio: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                >
                  Save Changes
                  <Save />
                </button>

              </form>
            </Reveal>

            {/* Security */}
            <Reveal
              variant="right"
              delay={100}
            >
              <form
                className="panel"
                onSubmit={savePassword}
              >

                <div className="panel-h">
                  <h3>
                    <ShieldCheck
                      size={18}
                      style={{
                        color: "var(--gold)",
                        verticalAlign: "-3px",
                      }}
                    />
                    Security
                  </h3>
                </div>

                <div className="frow">

                  <div className="field">
                    <label>Current Password</label>

                    <input
                      className="inp"
                      type="password"
                      value={pw.current}
                      onChange={(e) =>
                        setPw({
                          ...pw,
                          current: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="field">
                    <label>New Password</label>

                    <input
                      className="inp"
                      type="password"
                      value={pw.next}
                      onChange={(e) =>
                        setPw({
                          ...pw,
                          next: e.target.value,
                        })
                      }
                      placeholder="Min. 6 characters"
                    />
                  </div>

                </div>

                {pwErr && (
                  <p
                    className="ferr"
                    style={{ marginBottom: 16 }}
                  >
                    <AlertCircle size={13} />
                    {pwErr}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-line"
                >
                  Update Password
                </button>

              </form>
            </Reveal>

            {/* Notification Preferences */}
            <Reveal
              variant="right"
              delay={150}
            >
              <div className="panel">

                <div className="panel-h">
                  <h3>
                    Notification Preferences
                  </h3>
                </div>

                <div className="pf-prefs">

                  {[
                    [
                      "email",
                      "Email offers & inspiration",
                    ],
                    [
                      "sms",
                      "SMS booking reminders",
                    ],
                    [
                      "whatsapp",
                      "WhatsApp concierge updates",
                    ],
                  ].map(([key, label]) => (

                    <label
                      className="check"
                      key={key}
                    >

                      <input
                        type="checkbox"
                        checked={prefs[key]}
                        onChange={(e) => {
                          setPrefs({
                            ...prefs,
                            [key]: e.target.checked,
                          });

                          push(
                            "success",
                            "Preferences saved."
                          );
                        }}
                      />

                      {label}

                    </label>

                  ))}

                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}