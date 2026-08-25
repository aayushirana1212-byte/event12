import { Link } from "react-router-dom";
import { Crown, LogOut, Globe } from "lucide-react";

/* Shared dark sidebar for all dashboards */

export default function DashboardSidebar({
  title,
  items,
  active,
  onSelect,
  onLogout,
}) {
  return (
    <aside className="dside">
      <Link to="/" className="logo dside-logo">
        <span className="logo-ic">
          <Crown size={18} />
        </span>

        <span className="logo-t">
          AURELIA
          <small>{title}</small>
        </span>
      </Link>

      <nav className="dside-nav">
        {items.map((it) => {
          const Icon = it.icon;

          return (
            <button
              key={it.id}
              className={`dl ${active === it.id ? "on" : ""}`}
              onClick={() => onSelect(it.id)}
            >
              <Icon size={17} />
              {it.label}
            </button>
          );
        })}
      </nav>

      <div className="dside-foot">
        <Link to="/" className="dl">
          <Globe size={17} />
          Back to Website
        </Link>

        <button
          className="dl dl-out"
          onClick={onLogout}
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}