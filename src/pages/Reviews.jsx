import { useState } from "react";
import { Star, Send, AlertCircle } from "lucide-react";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { reviewsData } from "../data/content";
import "../css/misc.css";

const DIST = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

/* ============ REVIEWS PAGE ============ */
export default function Reviews() {
  const { user } = useAuth();
  const { push } = useToast();

  const [list, setList] = useState(reviewsData);

  const [f, setF] = useState({
    event: "Royal Wedding Affair",
    rating: 5,
    text: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (f.text.trim().length < 10) {
      return push(
        "error",
        "Please write at least 10 characters."
      );
    }

    setList([
      {
        id: Date.now(),
        name: user?.name || "Guest Member",
        event: f.event,
        rating: f.rating,
        date: "Just now",
        text: f.text,
        avatar:
          "https://images.pexels.com/photos/31420959/pexels-photo-31420959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300",
      },
      ...list,
    ]);

    setF({
      ...f,
      text: "",
    });

    push(
      "success",
      "Thank you! Your review is now live."
    );
  };

  return (
    <>
      <PageBanner
        title="Client Reviews"
        crumb="Reviews"
      />

      <section className="section">
        <div className="container">

          {/* Summary + Write Review */}
          <div className="rv-top">

            {/* Review Summary */}
            <Reveal variant="left">
              <div className="panel rvsum">

                <div className="rvsum-score">
                  <b>4.9</b>

                  <div>
                    <span className="stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill="var(--gold)"
                          color="var(--gold)"
                        />
                      ))}
                    </span>

                    <span className="rvsum-n">
                      1,284 verified reviews
                    </span>
                  </div>
                </div>

                <div className="rvbars">
                  {DIST.map((d) => (
                    <div
                      className="rvbar"
                      key={d.stars}
                    >
                      <span>{d.stars} ★</span>

                      <div className="track">
                        <i
                          style={{
                            width: `${d.pct}%`,
                          }}
                        />
                      </div>

                      <b>{d.pct}%</b>
                    </div>
                  ))}
                </div>

              </div>
            </Reveal>

            {/* Write Review */}
            <Reveal variant="right">
              <form
                className="panel"
                onSubmit={submit}
              >
                <div className="panel-h">
                  <h3>Share Your Experience</h3>
                </div>

                <div className="frow">

                  {/* Event */}
                  <div className="field">
                    <label>Your Event</label>

                    <select
                      className="inp"
                      value={f.event}
                      onChange={(e) =>
                        setF({
                          ...f,
                          event: e.target.value,
                        })
                      }
                    >
                      {[
                        "Royal Wedding Affair",
                        "Neon Pulse Live",
                        "Leadership Summit",
                        "Birthday Gala",
                        "Engagement Evening",
                        "Other",
                      ].map((x) => (
                        <option key={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div className="field">
                    <label>Rating</label>

                    <div className="rt-in">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          type="button"
                          key={n}
                          onClick={() =>
                            setF({
                              ...f,
                              rating: n,
                            })
                          }
                          aria-label={`${n} stars`}
                        >
                          <Star
                            size={26}
                            fill={
                              n <= f.rating
                                ? "var(--gold)"
                                : "none"
                            }
                            color="var(--gold)"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Review */}
                <div className="field">
                  <label>Your Review</label>

                  <textarea
                    className="inp"
                    placeholder="What made your celebration golden?"
                    value={f.text}
                    onChange={(e) =>
                      setF({
                        ...f,
                        text: e.target.value,
                      })
                    }
                  />

                  {f.text.length > 0 &&
                    f.text.length < 10 && (
                      <p className="ferr">
                        <AlertCircle size={13} />
                        At least 10 characters.
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                >
                  Publish Review <Send />
                </button>

              </form>
            </Reveal>

          </div>

          {/* Review Grid */}
          <SectionHeading
            kicker="Wall of Gold"
            title={
              <>
                Stories From{" "}
                <em className="gold-text">
                  Our Hosts
                </em>
              </>
            }
          />

          <div className="grid g3">
            {list.map((r, i) => (
              <Reveal
                key={r.id}
                delay={(i % 3) * 90}
              >
                <ReviewCard r={r} />
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}