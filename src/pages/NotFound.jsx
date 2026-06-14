import React from "react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

function NotFound() {
  return (
    <main className="page-loader">
      <div>
        <h1 style={{ fontSize: "72px", marginBottom: "12px" }}>404</h1>

        <p style={{ marginBottom: "24px" }}>
          This finance page does not exist.
        </p>

        <Link className="auth-submit" to="/dashboard">
          <FaHouse />
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFound;