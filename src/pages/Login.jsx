import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Crown,
  AlertCircle,
  Eye,
  EyeOff,
  LogIn,
  Quote,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { IMG } from "../data/content";

import "../css/auth.css";

/* ============ LOGIN PAGE ============ */

export default function Login() {
  const { login } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);

  // JSX ma TypeScript type remove kari didho
  const [err, setErr] = useState({});

  const submit = (e) => {
    e.preventDefault();

    const v = {};

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      v.email = "Enter a valid email address.";
    }

    // Password validation
    if (pass.length < 6) {
      v.pass = "Password must be at least 6 characters.";
    }

    setErr(v);

    // Error hoy to stop
    if (Object.keys(v).length > 0) {
      return;
    }

    // Login
    login(email);

    // Remember me
    if (remember) {
      localStorage.setItem("aurelia_remember", "1");
    } else {
      localStorage.removeItem("aurelia_remember");
    }

    // Toast
    push(
      "success",
      "Welcome back to Aurelia. Your dashboard awaits."
    );

    // Dashboard par navigate
    navigate("/dashboard");
  };

  return (
    <div className="auth">

      {/* ================= LEFT PANEL ================= */}
      <div
        className="auth-media"
        style={{ backgroundImage: `url(${IMG.auth})` }}
      >
        <div className="auth-media-ov" />

        <div className="auth-media-in">
          <Quote size={30} />

          <p>
            "The greatest events are not planned. They are composed —
            note by golden note."
          </p>

          <span>— Adrian Vale, Founder</span>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="auth-panel">
        <div className="auth-box">

          {/* Logo */}
          <Link to="/" className="logo auth-logo">
            <span className="logo-ic">
              <Crown size={20} />
            </span>

            <span className="logo-t">
              AURELIA
              <small>EVENTS</small>
            </span>
          </Link>

          <h1>Welcome Back</h1>

          <p className="auth-sub">
            Sign in to manage your bookings, payments and golden moments.
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={submit} noValidate>

            {/* Email */}
            <div className="field">
              <label>Email Address</label>

              <input
                className="inp"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {err.email && (
                <p className="ferr">
                  <AlertCircle size={13} />
                  {err.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>

              <div className="pw">
                <input
                  className="inp"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
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

            {/* Remember + Forgot */}
            <div className="auth-row">

              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />

                Remember me
              </label>

              <button
                type="button"
                className="auth-link"
                onClick={() =>
                  push(
                    "info",
                    "Password reset link sent to your email."
                  )
                }
              >
                Forgot password?
              </button>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-gold btn-block"
            >
              Sign In
              <LogIn />
            </button>

          </form>

          {/* Demo */}
          <div className="demo">
            Demo mode — any valid email & 6+ character password
            signs you in.
          </div>

          {/* Register */}
          <p className="auth-alt">
            New to Aurelia?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}