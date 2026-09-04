import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  CalendarCheck,
  CreditCard,
  Star,
  Bell,
  Eye,
  Crown,
  Check,
  Send,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import AnalyticsCard from "../components/AnalyticsCard";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getBookings, seedBookings } from "../data/store";

import "../css/dashboard.css";

/* ============ PAYMENT DATA ============ */

const PAYMENTS = [
  {
    id: "PAY-8821",
    booking: "Royal Wedding Affair",
    amount: "₹12,500",
    method: "Visa •• 4419",
    date: "Jan 10, 2026",
    status: "Paid",
  },
  {
    id: "PAY-8730",
    booking: "Leadership Summit",
    amount: "₹24,000",
    method: "Bank Transfer",
    date: "Jan 08, 2026",
    status: "Paid",
  },
  {
    id: "PAY-8699",
    booking: "Birthday Gala",
    amount: "₹3,200",
    method: "Mastercard •• 7782",
    date: "Jan 22, 2026",
    status: "Pending",
  },
  {
    id: "PAY-8512",
    booking: "Engagement Evening",
    amount: "₹1,050",
    method: "Visa •• 4419",
    date: "Dec 12, 2025",
    status: "Refunded",
  },
];

/* ============ NOTIFICATIONS ============ */

const NTFS = [
  {
    id: 1,
    title: "Booking BK9X2K1 confirmed",
    text: "Grand Aurelia Ballroom is locked for Feb 14.",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    title: "Payment reminder",
    text: "Milestone 2 for your wedding is due in 5 days.",
    time: "1d ago",
    unread: true,
  },
  {
    id: 3,
    title: "New décor catalog",
    text: "The 2026 Golden Collection just dropped.",
    time: "3d ago",
    unread: false,
  },
  {
    id: 4,
    title: "Review requested",
    text: "How was your Charity Dinner experience?",
    time: "1w ago",
    unread: false,
  },
];

/* ============ USER DASHBOARD ============ */

export default function UserDashboard() {
  const [tab, setTab] = useState("profile");

  const { user, logout } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const bookings = useMemo(
    () => [...getBookings(), ...seedBookings],
    []
  );

  const [reviews, setReviews] = useState([
    {
      id: 1,
      event: "Charity Black-Tie Dinner",
      rating: 5,
      text: "Flawless production. The auction stage design was stunning.",
      date: "Jun 15, 2026",
    },
  ]);

  const [rv, setRv] = useState({
    event: "Royal Wedding Affair",
    rating: 5,
    text: "",
  });

  /* ---------- SIDEBAR ITEMS ---------- */

  const items = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
    },
    {
      id: "bookings",
      label: "My Bookings",
      icon: CalendarCheck,
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
  ];

  /* ---------- LOGOUT ---------- */

  const doLogout = () => {
    logout();
    push("info", "Signed out. Until next time!");
    navigate("/");
  };

  /* ---------- USER ---------- */

  const u = user || {
    name: "Guest Member",
    email: "guest@aurelia.com",
    phone: "+1 555 0000",
  };

  /* ---------- STATUS CLASS ---------- */

  const stClass = (status) => {
    if (status === "Confirmed" || status === "Paid") {
      return "st-ok";
    }

    if (status === "Pending") {
      return "st-warn";
    }

    if (status === "Cancelled") {
      return "st-bad";
    }

    return "st-info";
  };

  /* ---------- ADD REVIEW ---------- */

  const addReview = (e) => {
    e.preventDefault();

    if (rv.text.trim().length < 10) {
      return push(
        "error",
        "Review must be at least 10 characters."
      );
    }

    setReviews([
      {
        id: Date.now(),
        event: rv.event,
        rating: rv.rating,
        text: rv.text,
        date: "Just now",
      },
      ...reviews,
    ]);

    setRv({
      ...rv,
      text: "",
    });

    push(
      "success",
      "Thank you! Your review has been published."
    );
  };

  return (
    <div className="dash">

      {/* ================= SIDEBAR ================= */}

      <DashboardSidebar
        title="USER PANEL"
        items={items}
        active={tab}
        onSelect={setTab}
        onLogout={doLogout}
      />

      {/* ================= MAIN ================= */}

      <div className="dmain">

        <DashboardHeader
          title={
            items.find((i) => i.id === tab)?.label ||
            "Dashboard"
          }
          sub={`Welcome back, ${
            u.name.split(" ")[0]
          } — everything golden at a glance.`}
        />

        {/* ================= MOBILE TABS ================= */}

        <div className="dtabs">
          {items.map((item) => (
            <button
              key={item.id}
              className={`pill ${
                tab === item.id ? "on" : ""
              }`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}

          <button
            className="pill"
            onClick={doLogout}
          >
            Logout
          </button>
        </div>

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        {tab === "profile" && (
          <div className="dgrid">

            {/* Profile Card */}

            <div className="panel pf-me">

              <span className="pf-av">
                {u.name.charAt(0).toUpperCase()}
              </span>

              <h3>{u.name}</h3>

              <span className="badge">
                <Crown size={11} />
                Golden Circle Member
              </span>

              <div className="pf-rows">

                <div>
                  <span>Email</span>
                  <b>{u.email}</b>
                </div>

                <div>
                  <span>Phone</span>
                  <b>
                    {u.phone || "+1 555 0000"}
                  </b>
                </div>

                <div>
                  <span>Member Since</span>
                  <b>January 2026</b>
                </div>

              </div>

              <button
                className="btn btn-line btn-sm"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </button>

            </div>

            {/* Right Side */}

            <div className="dcol">

              <div className="dgrid3">

                <AnalyticsCard
                  icon={CalendarCheck}
                  label="Total Bookings"
                  value={String(bookings.length)}
                  delta="+2 this month"
                />

                <AnalyticsCard
                  icon={CreditCard}
                  label="Total Invested"
                    value="₹40.7K"
                  delta="+12% vs 2025"
                />

                <AnalyticsCard
                  icon={Star}
                  label="Reviews Written"
                  value={String(reviews.length)}
                  delta="Keep it up!"
                />

              </div>

              {/* Recent Activity */}

              <div className="panel">

                <div className="panel-h">
                  <h3>Recent Activity</h3>
                </div>

                <ul className="act">

                  <li>
                    <Check size={15} />
                    Booking <b>BK9X2K1</b> confirmed by our
                    concierge
                    <span>2h ago</span>
                  </li>

                  <li>
                    <Check size={15} />
                    Payment of <b>₹12,500</b> received
                    <span>Jan 10</span>
                  </li>

                  <li>
                    <Check size={15} />
                    Décor mood board <b>approved</b>
                    <span>Jan 06</span>
                  </li>

                  <li>
                    <Check size={15} />
                    Account created — welcome!
                    <span>Jan 02</span>
                  </li>

                </ul>

              </div>

            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* BOOKINGS */}
        {/* ================================================= */}

        {tab === "bookings" && (
          <div className="panel">

            <div className="panel-h">

              <h3>
                My Bookings ({bookings.length})
              </h3>

              <button
                className="btn btn-gold btn-sm"
                onClick={() => navigate("/booking")}
              >
                New Booking
              </button>

            </div>

            <div className="tblw">

              <table className="tbl">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Event Type</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {bookings.map((b) => (
                    <tr key={b.id}>

                      <td className="muted">{b.id}</td>

                      <td>{b.type}</td>

                      <td className="muted">{b.venue}</td>

                      <td className="muted">{b.date} </td>

                      <td>{b.guests.toLocaleString()}</td>

                      <td>
                        <span
                          className={`st ${stClass(
                            b.status
                          )}`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td>

                        <button
                          className="icb"
                          onClick={() =>
                            push(
                              "info",
                              `Viewing booking ${b.id}`
                            )
                          }
                          aria-label="View"
                        >
                          <Eye />
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* PAYMENTS */}
        {/* ================================================= */}

        {tab === "payments" && (
          <div className="panel">

            <div className="panel-h">
              <h3>Payment History</h3>
            </div>

            <div className="tblw">

              <table className="tbl">

                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Booking</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {PAYMENTS.map((p) => (
                    <tr key={p.id}>

                      <td className="muted">{p.id}</td>

                      <td>{p.booking}</td>

                      <td style={{ color: "var(--gold)", fontWeight: 600,}}>{p.amount}</td>

                      <td className="muted">{p.method}</td>

                      <td className="muted"> {p.date}</td>

                      <td> <span className={`st ${stClass( p.status)}`} >{p.status} </span></td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* REVIEWS */}
        {/* ================================================= */}

        {tab === "reviews" && (
          <div className="dgrid">

            {/* Write Review */}

            <div className="panel">

              <div className="panel-h">
                <h3>Write a Review</h3>
              </div>

              <form onSubmit={addReview}>

                <div className="field">

                  <label>Event</label>

                  <select
                    className="inp"
                    value={rv.event}
                    onChange={(e) =>
                      setRv({
                        ...rv,
                        event: e.target.value,
                      })
                    }
                  >
                    {[
                      "Royal Wedding Affair",
                      "Leadership Summit",
                      "Birthday Gala",
                      "Charity Dinner",
                    ].map((x) => (
                      <option key={x}>
                        {x}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="field">

                  <label>Your Rating</label>

                  <div className="rt-in">

                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setRv({ ...rv, rating: n, })} aria-label={`${n} stars`}>
                        <Star size={26}
                          fill={
                            n <= rv.rating
                              ? "var(--gold)"
                              : "none"
                          }
                          color="var(--gold)"
                        />
                      </button>
                    ))}

                  </div>

                </div>

                <div className="field">

                  <label>Your Experience</label>

                  <textarea
                    className="inp"
                    placeholder="Share your golden moments..."
                    value={rv.text}
                    onChange={(e) =>
                      setRv({
                        ...rv,
                        text: e.target.value,
                      })
                    }
                  />

                </div>

                <button className="btn btn-gold">
                  Publish Review
                  <Send />
                </button>

              </form>

            </div>

            {/* Existing Reviews */}

            <div className="dcol">

              {reviews.map((r) => (
                <div className="panel" key={r.id} >

                  <div className="panel-h">

                    <h3 style={{ fontSize: 18 }}>{r.event} </h3>

                    <span className="stars">

                      {Array.from({
                        length: r.rating,
                      }).map((_, i) => (
                        <Star key={i} size={14} fill="var(--gold)" />
                      ))}

                    </span>

                  </div>

                  <p style={{ color: "var(--muted)", fontWeight: 300, }} >"{r.text}" </p>

                  <span className="rw-date">{r.date}</span>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* NOTIFICATIONS */}
        {/* ================================================= */}

        {tab === "notifications" && (
          <div className="panel">

            <div className="panel-h">

              <h3>Notifications</h3>

              <button
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  push(
                    "success",
                    "All notifications marked as read."
                  )}>
                Mark All Read
              </button>

            </div>

            <ul className="ntf">

              {NTFS.map((n) => (
                <li key={n.id} className={n.unread ? "unread" : "" } >

                  <span className="ntf-ic">
                    <Bell size={16} />
                  </span>

                  <div>

                    <b>{n.title}</b>

                    <p>{n.text}</p>

                  </div>

                  <span className="ntf-t">{n.time} </span>

                  {n.unread && (<i className="ntf-dot" /> )}

                </li>
              ))}

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}