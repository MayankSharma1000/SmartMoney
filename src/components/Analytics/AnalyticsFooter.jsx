import React, {
  useEffect,
  useState,
} from "react";

function AnalyticsFooter({
  user,
}) {
  const [time, setTime] =
    useState("");

  useEffect(() => {
    const now =
      new Date();

    setTime(
      now.toLocaleString(
        "en-IN",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      )
    );
  }, []);

  const name =
    user?.name ||
    "SmartMoney User";

  const email =
    user?.email ||
    "Account information unavailable";

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join("") ||
    "SM";

  const currency =
    user?.currency ||
    "INR";

  return (
    <footer className="analytics-footer">

      <div className="footer-profile">

        <div className="profile-avatar">
          {initials}
        </div>

        <div>
          <h3>
            {name}
          </h3>

          <p>
            {email}
          </p>
        </div>

      </div>

      <div className="analytics-footer-badges">

        <div className="footer-badge">
          Currency: {currency}
        </div>

        <div className="footer-badge">
          Analytics Active
        </div>

      </div>

      <div className="footer-right">

        <p>
          Analytics Updated
        </p>

        <strong>
          {time}
        </strong>

        <span>
          SmartMoney
        </span>

      </div>

    </footer>
  );
}

export default AnalyticsFooter;
