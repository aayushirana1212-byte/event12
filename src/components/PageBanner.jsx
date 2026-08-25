import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HERO_IMG } from "../data/content";

/* Shared inner-page hero banner with breadcrumb */
export default function PageBanner({
  title,
  crumb,
  bg = HERO_IMG,
}) {
  return (
    <header
      className="pbanner"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container">
        <h1 className="pb-title">{title}</h1>

        <nav className="crumb">
          <Link to="/">Home</Link>

          <ChevronRight />

          <span>{crumb}</span>
        </nav>
      </div>
    </header>
  );
}