/* Simple localStorage-backed store for bookings (demo database) */

const KEY = "aurelia_bookings";

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addBooking(b) {
  const booking = {
    ...b,
    id: "BK" + Date.now().toString(36).toUpperCase(),
    status: "Pending",
    createdAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  const all = getBookings();

  all.unshift(booking);

  localStorage.setItem(KEY, JSON.stringify(all));

  return booking;
}

/* Seed rows so dashboards look alive on first visit */

export const seedBookings = [
  {
    id: "BK9X2K1",
    name: "Isabella Laurent",
    email: "isabella@mail.com",
    phone: "+1 555 2233",
    type: "Wedding",
    venue: "Grand Aurelia Ballroom",
    date: "2026-02-14",
    time: "6:00 PM",
    guests: 450,
    budget: "₹50,000+",
    message: "",
    status: "Confirmed",
    createdAt: "Jan 10, 2026",
  },

  {
    id: "BK8M4P2",
    name: "Marcus Whitfield",
    email: "marcus@whitfield.com",
    phone: "+1 555 8877",
    type: "Corporate Event",
    venue: "Ivory Convention Center",
    date: "2026-03-21",
    time: "9:00 AM",
    guests: 2000,
    budget: "₹50,000+",
    message: "",
    status: "Confirmed",
    createdAt: "Jan 08, 2026",
  },

  {
    id: "BK7T1R9",
    name: "Amara Osei",
    email: "amara@mail.com",
    phone: "+1 555 3321",
    type: "Birthday Party",
    venue: "Velvet Orchid Banquet",
    date: "2026-04-05",
    time: "7:00 PM",
    guests: 120,
    budget: "₹10,000 - ₹25,000",
    message: "",
    status: "Pending",
    createdAt: "Jan 22, 2026",
  },

  {
    id: "BK6Q8N4",
    name: "Sofia Marchetti",
    email: "sofia@mail.com",
    phone: "+1 555 9081",
    type: "Engagement",
    venue: "Crystal Palace Gardens",
    date: "2026-04-18",
    time: "6:30 PM",
    guests: 250,
    budget: "₹25,000 - ₹50,000",
    message: "",
    status: "Pending",
    createdAt: "Jan 25, 2026",
  },
];