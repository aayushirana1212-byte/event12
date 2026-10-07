import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Crown, Mail, Quote } from "lucide-react";

import { IMG } from "../data/content";
import "../css/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setMessage("Password reset link has been sent to your email.");
    setEmail("");
  };

  return (
    <div className="auth">
      <div
        className="auth-media"
        style={{ backgroundImage: `url(${IMG.auth})` }}
      >
        <div className="auth-media-ov" />
        <div className="auth-media-in">
          <Quote size={30} />
          <p>
            “A perfectly planned celebration begins with a thoughtful reset —
            one small step toward a memorable day.”
          </p>
          <span>— The Aurelia Care Team</span>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-box">
          <Link to="/" className="logo auth-logo">
            <span className="logo-ic">
              <Crown size={20} />
            </span>
            <span className="logo-t">
              AURELIA
              <small>EVENTS</small>
            </span>
          </Link>

          <h1>Reset Password</h1>
          <p className="auth-sub">
            Enter your email address and we’ll send you a secure reset link.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label>Email Address</label>
              <div className="pw">
                <input
                  className="inp"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="button" aria-label="Email address field">
                  <Mail size={16} />
                </button>
              </div>
              {error && (
                <p className="ferr">
                  <AlertCircle size={13} />
                  {error}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-gold btn-block">
              Send Reset Link
            </button>
          </form>

          {message && <p className="success">{message}</p>}

          <p className="auth-alt">
            Remembered your password? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
