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
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { to: "/services", label: "All Services" },
  { to: "/vendors", label: "Vendor" },
  { to: "/venues", label: "Venue" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [serviceDrop, setServiceDrop] = useState(false);

  const { user, logout } = useAuth();
  const { push } = useToast();

  const location = useLocation();
  const navigate = useNavigate();

  const servicesActive = SERVICE_LINKS.some((link) =>
    location.pathname.startsWith(link.to)
  );

  /* ============================================================
     STICKY NAVBAR
     ============================================================ */

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

  /* ============================================================
     CLOSE MENUS WHEN ROUTE CHANGES
     ============================================================ */

  useEffect(() => {
    setOpen(false);
    setDrop(false);
    setServiceDrop(false);
  }, [location.pathname]);

  /* ============================================================
     PREVENT BODY SCROLL WHEN MOBILE DRAWER OPEN
     ============================================================ */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ============================================================
     LOGOUT
     ============================================================ */

  const doLogout = () => {
    logout();
    push("info", "You have been signed out. Until next time!");
    navigate("/");
  };

  /* ============================================================
     ACCOUNT DROPDOWN
     ============================================================ */

  const toggleDropdown = () => {
    setDrop((prev) => !prev);
  };

  /* ============================================================
     MOBILE DRAWER
     ============================================================ */

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  /* ============================================================
     SERVICES DROPDOWN
     ============================================================ */

  const toggleServiceDropdown = () => {
    setServiceDrop((prev) => !prev);
  };

  return (
    <>
      {/* ============================================================
          HEADER
          ============================================================ */}

      <header className={`nav ${scrolled || open ? "scrolled" : ""}`}>
        <div className="container nav-in">

          {/* ======================================================
              LOGO
              ====================================================== */}

          <Link to="/" className="logo">
            <span className="logo-ic">
              <Crown size={20} />
            </span>

            <span className="logo-t">
              AURELIA
              <small>EVENTS</small>
            </span>
          </Link>

          {/* ======================================================
              DESKTOP NAVIGATION
              ====================================================== */}

          <nav className="nav-links">

            {/* HOME + ABOUT */}

            {LINKS.slice(0, 2).map((link) => (
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

            {/* ==================================================
                SERVICES DROPDOWN
                ================================================== */}

            <div
              className={`service-menu ${
                serviceDrop ? "service-open" : ""
              }`}
            >
              <button
                type="button"
                className={`nav-link service-trigger ${
                  servicesActive ? "active" : ""
                }`}
                onClick={toggleServiceDropdown}
                aria-expanded={serviceDrop}
              >
                <span>Services</span>

                <ChevronDown
                  className="service-arrow"
                  size={14}
                />
              </button>

              {/* Dropdown */}

              <div className="service-dropdown">

                {SERVICE_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `service-item ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

              </div>
            </div>

            {/* ==================================================
                REMAINING LINKS
                ================================================== */}

            {LINKS.slice(2).map((link) => (
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

          {/* ======================================================
              ACTIONS
              ====================================================== */}

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

                {/* Account Dropdown */}

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

            {/* ==================================================
                MOBILE MENU BUTTON
                ================================================== */}

            <button
              className="burger"
              onClick={toggleDrawer}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* ============================================================
          MOBILE OVERLAY
          ============================================================ */}

      <div
        className={`dr-ov ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* ============================================================
          MOBILE DRAWER
          ============================================================ */}

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

        {/* ========================================================
            DRAWER LINKS
            ======================================================== */}

        <nav className="dr-links">

          {/* HOME + ABOUT */}

          {LINKS.slice(0, 2).map((link, index) => (
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

          {/* ======================================================
              MOBILE SERVICES
              ====================================================== */}

          <div className="mobile-service-group">

            <button
              type="button"
              className={`mobile-service-trigger ${
                servicesActive ? "active" : ""
              }`}
              onClick={toggleServiceDropdown}
              aria-expanded={serviceDrop}
            >
              <span>Services</span>

              <ChevronDown
                className={`mobile-arrow ${
                  serviceDrop ? "rotate" : ""
                }`}
                size={16}
              />
            </button>

            {/* Mobile Services Dropdown */}

            <div
              className={`mobile-service-dropdown ${
                serviceDrop ? "show" : ""
              }`}
            >

              {SERVICE_LINKS.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `mobile-service-link ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

            </div>

          </div>

          {/* ======================================================
              REMAINING MOBILE LINKS
              ====================================================== */}

          {LINKS.slice(2).map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `dr-link ${isActive ? "active" : ""}`
              }
              style={{
                transitionDelay: open
                  ? `${160 + index * 40}ms`
                  : "0ms",
              }}
            >
              {link.label}
            </NavLink>
          ))}

        </nav>

        {/* ========================================================
            DRAWER ACTIONS
            ======================================================== */}

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