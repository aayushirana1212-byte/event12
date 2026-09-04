import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Building2,
  Handshake,
  ClipboardList,
  CreditCard,
  Star,
  BarChart3,
  Eye,
  Pencil,
  Trash2,
  DollarSign,
  Check,
  X,
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
  reviewsData,
} from "../data/content";

import {
  getBookings,
  seedBookings,
} from "../data/store";

import "../css/dashboard.css";

const MONTHLY = [
  120, 180, 160, 235, 210, 290,
  320, 280, 345, 380, 330, 420
];

const MONTHS = [
  "J", "F", "M", "A", "M", "J",
  "J", "A", "S", "O", "N", "D"
];

const INIT_USERS = [
  {
    id: 1,
    name: "Isabella Laurent",
    email: "isabella@mail.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 2,
    name: "Marcus Whitfield",
    email: "marcus@whitfield.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 3,
    name: "Elena Rossi",
    email: "elena@aurelia.com",
    role: "Organizer",
    status: "Active",
  },
  {
    id: 4,
    name: "DJ Aria Waves",
    email: "aria@vendors.com",
    role: "Vendor",
    status: "Active",
  },
  {
    id: 5,
    name: "Tom Becker",
    email: "tom@mail.com",
    role: "Client",
    status: "Suspended",
  },
  {
    id: 6,
    name: "Henna Heritage",
    email: "henna@vendors.com",
    role: "Vendor",
    status: "Active",
  },
];

const INIT_PAYS = [
  {
    id: "PAY-8821",
    user: "Isabella Laurent",
    amount: "₹12,500",
    method: "Visa •• 4419",
    date: "Jan 10, 2026",
    status: "Paid",
  },
  {
    id: "PAY-8730",
    user: "Whitfield Group",
    amount: "₹24,000",
    method: "Bank Transfer",
    date: "Jan 08, 2026",
    status: "Paid",
  },
  {
    id: "PAY-8699",
    user: "Amara Osei",
    amount: "₹3,200",
    method: "Mastercard •• 7782",
    date: "Jan 22, 2026",
    status: "Pending",
  },
  {
    id: "PAY-8512",
    user: "Sofia Marchetti",
    amount: "₹1,050",
    method: "Visa •• 9920",
    date: "Dec 12, 2025",
    status: "Refunded",
  },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");

  const { logout } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  const [users, setUsers] = useState(INIT_USERS);
  const [evts, setEvts] = useState(events.slice(0, 8));
  const [vns, setVns] = useState(venues.slice(0, 6));
  const [vds, setVds] = useState(vendors.slice(0, 6));

  const [bks, setBks] = useState([
    ...getBookings(),
    ...seedBookings,
  ]);

  const [rvs, setRvs] = useState(
    reviewsData.map((r) => ({
      ...r,
      status: "Published",
    }))
  );

  const items = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "Manage Users",
      icon: Users,
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
      id: "bookings",
      label: "Manage Bookings",
      icon: ClipboardList,
    },
    {
      id: "payments",
      label: "Manage Payments",
      icon: CreditCard,
    },
    {
      id: "reviews",
      label: "Manage Reviews",
      icon: Star,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },
  ];

  const doLogout = () => {
    logout();
    push("info", "Signed out of admin.");
    navigate("/");
  };

  const maxBar = Math.max(...MONTHLY);

  const stClass = (status) => {
    if (
      status === "Active" ||
      status === "Paid" ||
      status === "Confirmed" ||
      status === "Published"
    ) {
      return "st-ok";
    }

    if (status === "Pending") {
      return "st-warn";
    }

    if (
      status === "Suspended" ||
      status === "Cancelled"
    ) {
      return "st-bad";
    }

    return "st-info";
  };

  const Bars = () => (
    <div className="bars">
      {MONTHLY.map((value, index) => (
        <div
          className="bar"
          key={index}
          title={`${value} bookings`}
        >
          <i
            style={{
              height: `${(value / maxBar) * 100}%`,
            }}
          />

          <span>{MONTHS[index]}</span>
        </div>
      ))}
    </div>
  );

  const Donut = () => (
    <div className="donut-w">
      <div className="donut">
        <div className="donut-c">
          <b>3,956</b>
          <span>Events</span>
        </div>
      </div>

      <ul className="legend">
        <li>
          <span
            className="dot"
            style={{ background: "#f2d57e" }}
          />
          Weddings <b>38%</b>
        </li>

        <li>
          <span
            className="dot"
            style={{ background: "#d4af37" }}
          />
          Corporate <b>26%</b>
        </li>

        <li>
          <span
            className="dot"
            style={{ background: "#a97e12" }}
          />
          Concerts <b>18%</b>
        </li>

        <li>
          <span
            className="dot"
            style={{ background: "#5c4a12" }}
          />
          Private <b>18%</b>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="dash">

      {/* SIDEBAR */}
      <DashboardSidebar
        title="ADMIN"
        items={items}
        active={tab}
        onSelect={setTab}
        onLogout={doLogout}
      />

      <div className="dmain">

        {/* HEADER */}
        <DashboardHeader
          title={
            items.find((item) => item.id === tab)?.label ||
            "Overview"
          }
          sub="Complete command of the Aurelia platform."
        />

        {/* TOP TABS */}
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

        {/* ================= OVERVIEW ================= */}
        {tab === "overview" && (
          <>
            <div className="dgrid4">

              <AnalyticsCard
                icon={Users}
                label="Total Users"
                value="12,480"
                delta="+8.2%"
              />

              <AnalyticsCard
                icon={ClipboardList}
                label="Total Bookings"
                value="3,956"
                delta="+14.6%"
              />

              <AnalyticsCard
                icon={DollarSign}
                label="Platform Revenue"
                value="₹2.4M"
                delta="+21.4%"
              />

              <AnalyticsCard
                icon={Star}
                label="Avg. Rating"
                value="4.9"
                delta="+0.2 pts"
              />

            </div>

            <div
              className="d2"
              style={{ marginBottom: 24 }}
            >

              <div className="panel">
                <div className="panel-h">
                  <h3>Bookings Trend — 2026</h3>
                </div>

                <Bars />
              </div>

              <div className="panel">
                <div className="panel-h">
                  <h3>Event Category Mix</h3>
                </div>

                <Donut />
              </div>

            </div>

            <div className="panel">

              <div className="panel-h">
                <h3>Recent Bookings</h3>
              </div>

              <div className="tblw">
                <table className="tbl">

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Type</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bks.slice(0, 5).map((booking) => (
                      <tr key={booking.id}>

                        <td className="muted">
                          {booking.id}
                        </td>

                        <td>
                          {booking.name}
                        </td>

                        <td className="muted">
                          {booking.type}
                        </td>

                        <td className="muted">
                          {booking.venue}
                        </td>

                        <td className="muted">
                          {booking.date}
                        </td>

                        <td>
                          <span
                            className={`st ${stClass(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </>
        )}

        {/* ================= USERS ================= */}
        {tab === "users" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                Platform Users ({users.length})
              </h3>
            </div>

            <div className="tblw">
              <table className="tbl">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>

                      <td>{user.name}</td>

                      <td className="muted">
                        {user.email}
                      </td>

                      <td>
                        <span
                          className={`st ${
                            user.role === "Organizer"
                              ? "st-info"
                              : user.role === "Vendor"
                              ? "st-warn"
                              : "st-ok"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`st ${stClass(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td>
                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Viewing ${user.name}`
                              )
                            }
                            aria-label="View"
                          >
                            <Eye />
                          </button>

                          <button
                            className="icb del"
                            onClick={() => {
                              setUsers(
                                users.filter(
                                  (x) => x.id !== user.id
                                )
                              );

                              push(
                                "success",
                                `${user.name} removed.`
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

        {/* ================= EVENTS ================= */}
        {tab === "events" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                All Events ({evts.length})
              </h3>
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
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {evts.map((event) => (
                    <tr key={event.id}>

                      <td>{event.title}</td>

                      <td className="muted">
                        {event.category}
                      </td>

                      <td className="muted">
                        {event.date}
                      </td>

                      <td
                        style={{
                          color: "var(--gold)",
                        }}
                      >
                        ₹{event.price.toLocaleString()}
                      </td>

                      <td>{event.rating}</td>

                      <td>
                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Edit ${event.title} (demo)`
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
                                  (x) => x.id !== event.id
                                )
                              );

                              push(
                                "success",
                                `${event.title} deleted.`
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

        {/* ================= VENUES ================= */}
        {tab === "venues" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                All Venues ({vns.length})
              </h3>
            </div>

            <div className="tblw">
              <table className="tbl">

                <thead>
                  <tr>
                    <th>Venue</th>
                    <th>Category</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {vns.map((venue) => (
                    <tr key={venue.id}>

                      <td>{venue.name}</td>

                      <td className="muted">
                        {venue.category}
                      </td>

                      <td>
                        {venue.capacity.toLocaleString()}
                      </td>

                      <td
                        style={{
                          color: "var(--gold)",
                        }}
                      >
                        ₹{venue.price.toLocaleString()}
                      </td>

                      <td>{venue.rating}</td>

                      <td>
                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Edit ${venue.name} (demo)`
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
                                  (x) => x.id !== venue.id
                                )
                              );

                              push(
                                "success",
                                `${venue.name} deleted.`
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

        {/* ================= VENDORS ================= */}
        {tab === "vendors" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                All Vendors ({vds.length})
              </h3>
            </div>

            <div className="tblw">
              <table className="tbl">

                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Experience</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {vds.map((vendor) => (
                    <tr key={vendor.id}>

                      <td>{vendor.name}</td>

                      <td className="muted">
                        {vendor.category}
                      </td>

                      <td>
                        {vendor.experience} yrs
                      </td>

                      <td>{vendor.rating}</td>

                      <td>
                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Edit ${vendor.name} (demo)`
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
                                  (x) => x.id !== vendor.id
                                )
                              );

                              push(
                                "success",
                                `${vendor.name} deleted.`
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

        {/* ================= BOOKINGS ================= */}
        {tab === "bookings" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                All Bookings ({bks.length})
              </h3>
            </div>

            <div className="tblw">
              <table className="tbl">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Venue</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bks.map((booking) => (
                    <tr key={booking.id}>

                      <td className="muted">
                        {booking.id}
                      </td>

                      <td>{booking.name}</td>

                      <td className="muted">
                        {booking.type}
                      </td>

                      <td className="muted">
                        {booking.venue}
                      </td>

                      <td>
                        {booking.guests.toLocaleString()}
                      </td>

                      <td>
                        <span
                          className={`st ${stClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td>
                        <div className="tbl-act">

                          <button
                            className="icb"
                            onClick={() =>
                              push(
                                "info",
                                `Booking ${booking.id} details (demo)`
                              )
                            }
                            aria-label="View"
                          >
                            <Eye />
                          </button>

                          <button
                            className="icb del"
                            onClick={() => {
                              setBks(
                                bks.filter(
                                  (x) =>
                                    x.id !== booking.id
                                )
                              );

                              push(
                                "success",
                                `Booking ${booking.id} deleted.`
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

        {/* ================= PAYMENTS ================= */}
        {tab === "payments" && (
          <div className="panel">

            <div className="panel-h">
              <h3>Payment Ledger</h3>
            </div>

            <div className="tblw">
              <table className="tbl">

                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Client</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {INIT_PAYS.map((payment) => (
                    <tr key={payment.id}>

                      <td className="muted">
                        {payment.id}
                      </td>

                      <td>{payment.user}</td>

                      <td
                        style={{
                          color: "var(--gold)",
                          fontWeight: 600,
                        }}
                      >
                        {payment.amount}
                      </td>

                      <td className="muted">
                        {payment.method}
                      </td>

                      <td className="muted">
                        {payment.date}
                      </td>

                      <td>
                        <span
                          className={`st ${stClass(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* ================= REVIEWS ================= */}
        {tab === "reviews" && (
          <div className="panel">

            <div className="panel-h">
              <h3>
                Client Reviews ({rvs.length})
              </h3>
            </div>

            <div className="req">

              {rvs.map((review) => (
                <div
                  className="req-card"
                  key={review.id}
                >

                  <img
                    src={review.avatar}
                    alt=""
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--gold)",
                    }}
                  />

                  <div className="req-info">

                    <b>
                      {review.name}

                      <span
                        className="stars"
                        style={{
                          marginLeft: 8,
                        }}
                      >
                        {Array.from({
                          length: review.rating,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={12}
                            fill="var(--gold)"
                            color="var(--gold)"
                          />
                        ))}
                      </span>
                    </b>

                    <span>
                      {review.event} — "
                      {review.text.slice(0, 90)}
                      ..."
                    </span>

                  </div>

                  <span
                    className={`st ${stClass(
                      review.status
                    )}`}
                  >
                    {review.status}
                  </span>

                  <div className="req-acts">

                    <button
                      className="btn-mini btn-acc"
                      onClick={() => {
                        setRvs(
                          rvs.map((item) =>
                            item.id === review.id
                              ? {
                                  ...item,
                                  status: "Published",
                                }
                              : item
                          )
                        );

                        push(
                          "success",
                          "Review approved."
                        );
                      }}
                    >
                      <Check size={13} />
                    </button>

                    <button
                      className="btn-mini btn-dec"
                      onClick={() => {
                        setRvs(
                          rvs.filter(
                            (item) =>
                              item.id !== review.id
                          )
                        );

                        push(
                          "info",
                          "Review removed."
                        );
                      }}
                    >
                      <X size={13} />
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* ================= ANALYTICS ================= */}
        {tab === "analytics" && (
          <>

            <div className="dgrid4">

              <AnalyticsCard
                icon={DollarSign}
                label="Revenue / Event"
                value="₹607"
                delta="+9.1%"
              />

              <AnalyticsCard
                icon={ClipboardList}
                label="Conversion Rate"
                value="34%"
                delta="+4.2 pts"
              />

              <AnalyticsCard
                icon={Users}
                label="Repeat Clients"
                value="41%"
                delta="+6 pts"
              />

              <AnalyticsCard
                icon={Star}
                label="NPS Score"
                value="72"
                delta="Excellent"
              />

            </div>

            <div className="d2">

              <div className="panel">

                <div className="panel-h">
                  <h3>
                    Annual Booking Volume
                  </h3>
                </div>

                <Bars />

              </div>

              <div className="panel">

                <div className="panel-h">
                  <h3>
                    Revenue by Category
                  </h3>
                </div>

                <Donut />

              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
}