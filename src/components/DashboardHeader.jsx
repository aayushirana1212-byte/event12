import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

/* Shared top bar for dashboards */

export default function DashboardHeader({ title, sub }) {
  const { user } = useAuth();
  const { push } = useToast();

  return (
    <div className="dhead">
      <div>
        <h1>{title}</h1>

        {sub && <p>{sub}</p>}
      </div>

      <div className="dhead-acts">
        <div className="dhead-search">
          <Search size={15} />

          <input
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        <button
          className="dhead-bell"
          onClick={() =>
            push(
              "info",
              "You have 3 new notifications."
            )
          }
          aria-label="Notifications"
        >
          <Bell size={17} />
          <i />
        </button>

        <span className="uav">
          {user
            ? user.name.charAt(0).toUpperCase()
            : "G"}
        </span>
      </div>
    </div>
  );
}