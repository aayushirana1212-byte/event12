import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Crown,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  Quote,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { IMG } from "../data/content";
import "../css/auth.css";

/* ============ REGISTER PAGE ============ */
export default function Register() {
  const { register } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    pass: "",
    confirm: "",
  });

  const [err, setErr] = useState({});
  const [show, setShow] = useState(false);

  const set = (key) => (e) => {
    setF({
      ...f,
      [key]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const v = {};

    if (f.name.trim().length < 3) {
      v.name = "Enter your full name.";
    }

    if (!/^\S+@\S+\.\S+$/.test(f.email)) {
      v.email = "Enter a valid email address.";
    }

    if (!/^[\d\s+()-]{7,16}$/.test(f.phone)) {
      v.phone = "Enter a valid phone number.";
    }

    if (f.pass.length < 6) {
      v.pass = "Minimum 6 characters.";
    }

    if (f.confirm !== f.pass) {
      v.confirm = "Passwords do not match.";
    }

    setErr(v);

    if (Object.keys(v).length) {
      return;
    }

    register(
      f.name,
      f.email,
      f.phone
    );

    push(
      "success",
      "Account created — welcome to the Golden Circle!"
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth">

      {/* LEFT — Cinematic Panel */}
      <div
        className="auth-media"
        style={{
          backgroundImage: `url(${IMG.aboutMain})`,
        }}
      >
        <div className="auth-media-ov" />

        <div className="auth-media-in">
          <Quote size={30} />

          <p>
            "Join 12,000+ hosts who trust Aurelia
            with the most important days of their lives."
          </p>

          <span>
            — The Aurelia Family
          </span>
        </div>
      </div>

      {/* RIGHT — Register Form */}
      <div className="auth-panel">

        <div className="auth-box">

          {/* Logo */}
          <Link
            to="/"
            className="logo auth-logo"
          >
            <span className="logo-ic">
              <Crown size={20} />
            </span>

            <span className="logo-t">
              AURELIA
              <small>EVENTS</small>
            </span>
          </Link>

          <h1>Create Account</h1>

          <p className="auth-sub">
            Begin your journey toward an unforgettable celebration.
          </p>

          <form
            onSubmit={submit}
            noValidate
          >

            {/* Full Name */}
            <div className="field">

              <label>Full Name</label>

              <input
                className="inp"
                placeholder="e.g. Alexandra Reyes"
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

            {/* Email + Phone */}
            <div className="frow">

              <div className="field">

                <label>Email</label>

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

              <div className="field">

                <label>Phone</label>

                <input
                  className="inp"
                  placeholder="+1 555 000 0000"
                  value={f.phone}
                  onChange={set("phone")}
                />

                {err.phone && (
                  <p className="ferr">
                    <AlertCircle size={13} />
                    {err.phone}
                  </p>
                )}

              </div>

            </div>

            {/* Password + Confirm Password */}
            <div className="frow">

              <div className="field">

                <label>Password</label>

                <div className="pw">

                  <input
                    className="inp"
                    type={show ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={f.pass}
                    onChange={set("pass")}
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label="Toggle password"
                  >
                    {show ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                </div>

                {err.pass && (
                  <p className="ferr">
                    <AlertCircle size={13} />
                    {err.pass}
                  </p>
                )}

              </div>

              <div className="field">

                <label>Confirm Password</label>

                <input
                  className="inp"
                  type={show ? "text" : "password"}
                  placeholder="Repeat password"
                  value={f.confirm}
                  onChange={set("confirm")}
                />

                {err.confirm && (
                  <p className="ferr">
                    <AlertCircle size={13} />
                    {err.confirm}
                  </p>
                )}

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-gold btn-block"
            >
              Create Account
              <UserPlus />
            </button>

          </form>

          {/* Login Link */}
          <p className="auth-alt">
            Already a member?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}