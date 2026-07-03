import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button/Button";

import {
  FaBell,
  FaMagnifyingGlass,
  FaUser
} from "react-icons/fa6";

import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const handleSearch = () => {
    if (!searchText.trim()) return;

    navigate(
      `/expenses?search=${encodeURIComponent(
        searchText
      )}`
    );
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>
          {greeting}
          {user?.name
            ? `, ${user.name}`
            : ""}
        </h2>

        <p>
          Let's grow your wealth and
          eliminate wasteful spending.
        </p>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <FaMagnifyingGlass />

          <input
            type="text"
            placeholder="Search expenses..."
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                handleSearch();
              }
            }}
          />
        </div>

        <Button
          className="notification-btn"
          title="Notifications"
        >
          <FaBell />

          <span className="notification-dot"></span>
        </Button>

        <ThemeToggle />

        <Button
          className="user-avatar profile-avatar-btn"
          onClick={() =>
            navigate("/profile")
          }
          title="Open Profile"
        >
          {user?.name ? (
            user.name
              .charAt(0)
              .toUpperCase()
          ) : (
            <FaUser />
          )}
        </Button>
      </div>
    </header>
  );
}

export default Navbar;