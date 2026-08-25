import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Crown,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  User,
  LogOut,
  Shield,
  ClipboardList,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

import "../css/navbar.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/events", label: "Events" },
  { to: "/venues", label: "Venues" },
  { to: "/vendors", label: "Vendors" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const { user, logout } = useAuth();
  const { push } = useToast();

  const location = useLocation();
  const navigate = useNavigate();

  // Sticky background after scrolling
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [location.pathname]);

  // Prevent page scrolling when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const doLogout = () => {
    logout();
    push("info", "You have been signed out. Until next time!");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDrop((prev) => !prev);
  };

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={`nav ${scrolled || open ? "scrolled" : ""}`}>
        <div className="container nav-in">

          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-ic">
              <Crown size={20} />
            </span>

            <span className="logo-t">
              AURELIA
              <small>EVENTS</small>
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="nav-links">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ================= ACTIONS ================= */}
          <div className="nav-acts">

            {user ? (
              <div className="ume">

                {/* Avatar */}
                <button
                  className="uav"
                  onClick={toggleDropdown}
                  aria-label="Account menu"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </button>

                {/* Username */}
                <button
                  className="uname"
                  onClick={toggleDropdown}
                >
                  {user.name?.split(" ")[0] || "User"}
                  <ChevronDown size={14} />
                </button>

                {/* Dropdown */}
                {drop && (
                  <div className="udrop">

                    <Link
                      to="/dashboard"
                      className="ud-item"
                    >
                      <LayoutDashboard size={15} />
                      My Dashboard
                    </Link>

                    <Link
                      to="/organizer"
                      className="ud-item"
                    >
                      <ClipboardList size={15} />
                      Organizer Panel
                    </Link>

                    <Link
                      to="/admin"
                      className="ud-item"
                    >
                      <Shield size={15} />
                      Admin Panel
                    </Link>

                    <Link
                      to="/profile"
                      className="ud-item"
                    >
                      <User size={15} />
                      My Profile
                    </Link>

                    <button
                      onClick={doLogout}
                      className="ud-item ud-out"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-ghost btn-sm nav-login"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-gold btn-sm"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="burger"
              onClick={toggleDrawer}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`dr-ov ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside className={`drawer ${open ? "open" : ""}`}>

        {/* Drawer Header */}
        <div className="dr-head">
          <span className="logo-ic">
            <Crown size={18} />
          </span>

          <span className="logo-t">
            AURELIA
            <small>EVENTS</small>
          </span>
        </div>

        {/* Drawer Links */}
        <nav className="dr-links">
          {LINKS.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `dr-link ${isActive ? "active" : ""}`
              }
              style={{
                transitionDelay: open
                  ? `${80 + index * 40}ms`
                  : "0ms",
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer Actions */}
        <div className="dr-acts">

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="btn btn-line btn-block"
              >
                My Dashboard
              </Link>

              <button
                onClick={doLogout}
                className="btn btn-gold btn-block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-line btn-block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-gold btn-block"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </aside>
    </>
  );
}