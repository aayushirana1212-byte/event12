import { Link, useNavigate } from "react-router-dom";
import { Home, Undo2 } from "lucide-react";

import "../css/misc.css";

/* ============ 404 NOT FOUND PAGE ============ */

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="nf">

      <span className="badge"> Error 404 </span>

      <h1 className="nf-code gold-text"> 404</h1>

      <h2> This Ballroom Is Empty</h2>

      <p> The page you're looking for has left the party — or never received an invitation.</p>

      <div className="nf-acts">

        {/* Home */}
        <Link to="/" className="btn btn-gold"> <Home size={18} />Back to Home </Link>

        {/* Previous page */}
        <button onClick={() => navigate(-1)} className="btn btn-ghost" >
          <Undo2 size={18} />
          Go Back
        </button>

      </div>

    </section>
  );
}