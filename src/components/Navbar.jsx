import React from "react";
import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user } = useAuth();

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>
          {greeting}
          {user?.name ? `, ${user.name}` : ""}
        </h2>

        <p>Let's grow your wealth and eliminate wasteful spending.</p>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <FaMagnifyingGlass />

          <input
            type="text"
            placeholder="Search transactions..."
          />
        </div>

        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <ThemeToggle />

        <div className="user-avatar">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "M"}
        </div>
      </div>
    </header>
  );
}

export default Navbar;