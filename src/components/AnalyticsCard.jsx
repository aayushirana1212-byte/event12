import { TrendingUp, TrendingDown } from "lucide-react";

export default function AnalyticsCard({
  icon: Icon,
  label,
  value,
  delta,
  up = true,
}) {
  return (
    <div className="card ac">
      <span className="ac-ic">
        <Icon size={22} />
      </span>

      <div className="ac-body">
        <span className="ac-lb">{label}</span>

        <b className="ac-v">{value}</b>

        <span className={`ac-d ${up ? "up" : "dn"}`}>
          {up ? (
            <TrendingUp size={13} />
          ) : (
            <TrendingDown size={13} />
          )}

          {delta}
        </span>
      </div>
    </div>
  );
}