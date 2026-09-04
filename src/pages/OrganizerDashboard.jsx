import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Handshake,
  ClipboardList,
  BarChart3,
  Eye,
  Pencil,
  Trash2,
  Plus,
  DollarSign,
  Star,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import AnalyticsCard from "../components/AnalyticsCard";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

import {
  events,
  venues,
  vendors,
} from "../data/content";

import "../css/dashboard.css";

const MONTHLY = [
  42, 58, 51, 74, 69, 88,
  95, 83, 97, 104, 91, 120,
];

const MONTHS = [
  "J", "F", "M", "A", "M", "J",
  "J", "A", "S", "O", "N", "D",
];

const INIT_REQS = [
  {
    id: 1,
    name: "Amara Osei",
    event: "50th Birthday Gala — Velvet Orchid",
    date: "Apr 05, 2026",
    guests: 120,
    budget: "₹18,000",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sofia Marchetti",
    event: "Engagement — Crystal Palace Gardens",
    date: "Apr 18, 2026",
    guests: 250,
    budget: "₹32,000",
    status: "Pending",
  },
  {
    id: 3,
    name: "David Mensah",
    event: "Product Launch — Ivory Convention",
    date: "May 22, 2026",
    guests: 800,
    budget: "₹65,000",
    status: "Pending",
  },
  {
    id: 4,
    name: "Priya Sharma",
    event: "Sangeet Night — Heritage Palace",
    date: "Jun 02, 2026",
    guests: 400,
    budget: "₹28,000",
    status: "Accepted",
  },
];

/* ============ ORGANIZER DASHBOARD ============ */

export default function OrganizerDashboard() {
  const [tab, setTab] = useState("overview");

  const { logout } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const [evts, setEvts] = useState(events.slice(0, 6));
  const [vns, setVns] = useState(venues.slice(0, 6));
  const [vds, setVds] = useState(vendors.slice(0, 6));
  const [reqs, setReqs] = useState(INIT_REQS);

  const items = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "events",
      label: "Manage Events",
      icon: CalendarCheck,
    },
    {
      id: "venues",
      label: "Manage Venues",
      icon: Building2,
    },
    {
      id: "vendors",
      label: "Manage Vendors",
      icon: Handshake,
    },
    {
      id: "requests",
      label: "Booking Requests",
      icon: ClipboardList,
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
    },
  ];

  const doLogout = () => {
    logout();
    push("info", "Signed out.");
    navigate("/");
  };

  const maxBar = Math.max(...MONTHLY);

  const actReq = (id, status) => {
    setReqs(
      reqs.map((r) =>
        r.id === id
          ? { ...r, status }
          : r
      )
    );

    const r = reqs.find((x) => x.id === id);

    push(
      status === "Accepted"
        ? "success"
        : "info",
      `Request from ${r?.name} ${status.toLowerCase()}.`
    );
  };

  return (
    <div className="dash">

      {/* ================= SIDEBAR ================= */}

      <DashboardSidebar
        title="ORGANIZER"
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
            "Overview"
          }
          sub="Production control for your events, venues and vendor network."
        />

        {/* Dashboard tabs */}

        <div className="dtabs">

          {items.map((i) => (
            <button
              key={i.id}
              className={`pill ${
                tab === i.id ? "on" : ""
              }`}
              onClick={() => setTab(i.id)}
            >
              {i.label}
            </button>
          ))}

          <button
            className="pill"
            onClick={doLogout}
          >
            Logout
          </button>

        </div>

        {/* =====================================================
            OVERVIEW
        ===================================================== */}

        {tab === "overview" && (
          <>
            <div className="dgrid4">

              <AnalyticsCard
                icon={CalendarCheck}
                label="Active Events"
                value="24"
                delta="+6 this quarter"
              />

              <AnalyticsCard
                icon={ClipboardList}
                label="Pending Requests"
                value={String(
                  reqs.filter(
                    (r) => r.status === "Pending"
                  ).length
                )}
                delta="Needs review"
                up={false}
              />

              <AnalyticsCard
                icon={DollarSign}
                label="Revenue (Month)"
                value="₹84.2K"
                delta="+18.2%"
              />

              <AnalyticsCard
                icon={Star}
                label="Team Rating"
                value="4.9"
                delta="+0.2 pts"
              />

            </div>

            <div className="d2">

              {/* Monthly bookings */}

              <div className="panel">

                <div className="panel-h">
                  <h3>
                    Bookings — Last 12 Months
                  </h3>
                </div>

                <div className="bars">

                  {MONTHLY.map((v, i) => (
                    <div
                      className="bar"
                      key={i}
                      title={`${v} bookings`}
                    >
                      <i
                        style={{
                          height: `${(v / maxBar) * 100}%`,
                        }}
                      />

                      <span>
                        {MONTHS[i]}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

              {/* Latest Requests */}

              <div className="panel">

                <div className="panel-h">
                  <h3>
                    Latest Requests
                  </h3>
                </div>

                <div className="req">

                  {reqs
                    .slice(0, 3)
                    .map((r) => (
                      <div
                        className="req-card"
                        key={r.id}
                      >

                        <span className="req-av">
                          {r.name.charAt(0)}
                        </span>

                        <div className="req-info">

                          <b>{r.name}</b>

                          <span>
                            {r.event} ·{" "}
                            {r.guests} guests
                          </span>

                        </div>

                        <span
                          className={`st ${
                            r.status === "Pending"
                              ? "st-warn"
                              : r.status === "Accepted"
                              ? "st-ok"
                              : "st-bad"
                          }`}
                        >
                          {r.status}
                        </span>

                      </div>
                    ))}

                </div>

              </div>

            </div>
          </>
        )}

        {/* =====================================================
            MANAGE EVENTS
        ===================================================== */}

        {tab === "events" && (
          <div className="panel">

            <div className="panel-h">

              <h3>
                Events ({evts.length})
              </h3>

              <button
                className="btn btn-gold btn-sm"
                onClick={() =>
                  push(
                    "info",
                    "Event creation studio — opening soon in this demo."
                  )
                }
              >
                <Plus size={14} />
                New Event
              </button>

            </div>

            <div className="tblw">

              <table className="tbl">

                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {evts.map((e) => (
                    <tr key={e.id}>

                      <td>{e.title}</td>

                      <td className="muted">
                        {e.category}
                      </td>

                      <td className="muted">
                        {e.date}
                      </td>

                      <td style={{ color: "var(--gold)" }}>
                        ₹{e.price.toLocaleString()}
                      </td>

                      <td>{e.rating}</td>

                      <td>
                        <span className="st st-ok">
                          Active
                        </span>
                      </td>

                      <td>

                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Previewing ${e.title}`
                              )
                            }
                            aria-label="View"
                          >
                            <Eye />
                          </button>

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Edit panel for ${e.title} (demo)`
                              )
                            }
                            aria-label="Edit"
                          >
                            <Pencil />
                          </button>

                          <button
                            className="icb del"
                            onClick={() => {
                              setEvts(
                                evts.filter(
                                  (x) => x.id !== e.id
                                )
                              );

                              push(
                                "success",
                                `${e.title} removed.`
                              );
                            }}
                            aria-label="Delete"
                          >
                            <Trash2 />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* =====================================================
            MANAGE VENUES
        ===================================================== */}

        {tab === "venues" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                Partner Venues ({vns.length})
              </h3>
            </div>

            <div className="tblw">

              <table className="tbl">

                <thead>
                  <tr>
                    <th>Venue</th>
                    <th>Location</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {vns.map((v) => (
                    <tr key={v.id}>

                      <td>{v.name}</td>

                      <td className="muted">
                        {v.location}
                      </td>

                      <td>
                        {v.capacity.toLocaleString()}
                      </td>

                      <td style={{ color: "var(--gold)" }}>
                        ₹{v.price.toLocaleString()}
                      </td>

                      <td>{v.rating}</td>

                      <td>

                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Edit panel for ${v.name} (demo)`
                              )
                            }
                            aria-label="Edit"
                          >
                            <Pencil />
                          </button>

                          <button
                            className="icb del"
                            onClick={() => {
                              setVns(
                                vns.filter(
                                  (x) => x.id !== v.id
                                )
                              );

                              push(
                                "success",
                                `${v.name} removed.`
                              );
                            }}
                            aria-label="Delete"
                          >
                            <Trash2 />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* =====================================================
            MANAGE VENDORS
        ===================================================== */}

        {tab === "vendors" && (
          <div className="panel">

            <div className="panel-h">

              <h3>
                Vendor Network ({vds.length})
              </h3>

            </div>

            <div className="tblw">

              <table className="tbl">

                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Experience</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {vds.map((v) => (
                    <tr key={v.id}>

                      <td>{v.name}</td>

                      <td className="muted">
                        {v.category}
                      </td>

                      <td>
                        {v.experience} yrs
                      </td>

                      <td className="muted">
                        {v.price}
                      </td>

                      <td>{v.rating}</td>

                      <td>

                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Edit panel for ${v.name} (demo)`
                              )
                            }
                            aria-label="Edit"
                          >
                            <Pencil />
                          </button>

                          <button
                            className="icb del"
                            onClick={() => {
                              setVds(
                                vds.filter(
                                  (x) => x.id !== v.id
                                )
                              );

                              push(
                                "success",
                                `${v.name} removed.`
                              );
                            }}
                            aria-label="Delete"
                          >
                            <Trash2 />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* =====================================================
            BOOKING REQUESTS
        ===================================================== */}

        {tab === "requests" && (
          <div className="panel">

            <div className="panel-h">

              <h3>
                Booking Requests (
                {
                  reqs.filter(
                    (r) => r.status === "Pending"
                  ).length
                } pending)
              </h3>

            </div>

            <div className="req">

              {reqs.map((r) => (
                <div
                  className="req-card"
                  key={r.id}
                >

                  <span className="req-av">
                    {r.name.charAt(0)}
                  </span>

                  <div className="req-info">

                    <b>{r.name}</b>

                    <span>
                      {r.event}
                    </span>

                    <span>
                      {r.date} · {r.guests} guests ·
                      {" "}Budget {r.budget}
                    </span>

                  </div>

                  {r.status === "Pending" ? (
                    <div className="req-acts">

                      <button
                        className="btn-mini btn-acc"
                        onClick={() =>
                          actReq(
                            r.id,
                            "Accepted"
                          )
                        }
                      >
                        Accept
                      </button>

                      <button
                        className="btn-mini btn-dec"
                        onClick={() =>
                          actReq(
                            r.id,
                            "Declined"
                          )
                        }
                      >
                        Decline
                      </button>

                    </div>
                  ) : (
                    <span
                      className={`st ${
                        r.status === "Accepted"
                          ? "st-ok"
                          : "st-bad"
                      }`}
                    >
                      {r.status}
                    </span>
                  )}

                </div>
              ))}

            </div>

          </div>
        )}

        {/* =====================================================
            REPORTS
        ===================================================== */}

        {tab === "reports" && (
          <>

            <div
              className="dgrid3"
              style={{ marginBottom: 24 }}
            >

              <AnalyticsCard
                icon={CalendarCheck}
                label="Events Completed"
                value="186"
                delta="+22% YoY"
              />

              <AnalyticsCard
                icon={DollarSign}
                label="Annual Revenue"
                value="₹1.2M"
                delta="+31% YoY"
              />

              <AnalyticsCard
                icon={Star}
                label="Client Satisfaction"
                value="98%"
                delta="+3 pts"
              />

            </div>

            <div className="panel">

              <div className="panel-h">
                <h3>
                  Quarterly Revenue ($K)
                </h3>
              </div>

              <div
                className="bars"
                style={{ maxWidth: 560 }}
              >

                {[212, 268, 331, 389].map(
                  (v, i) => (
                    <div
                      className="bar"
                      key={i}
                      title={`$${v}K`}
                    >

                      <i
                        style={{
                          height: `${(v / 389) * 100}%`,
                        }}
                      />

                      <span>
                        Q{i + 1}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
}