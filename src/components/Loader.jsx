import { Crown } from "lucide-react";

/* Full-screen brand loading spinner */
export default function Loader() {
  return (
    <div className="loader">
      <div className="ld-crown">
        <Crown />
      </div>

      <div className="ld-name">
        AURELIA <span>EVENTS</span>
      </div>

      <div className="ld-bar" />
    </div>
  );
}