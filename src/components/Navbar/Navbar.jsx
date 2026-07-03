import React from "react";
import Button from "../ui/Button/Button";
import "../../styles/Navbar.css";
import {
  FaBell,
  FaSearch
} from "react-icons/fa";

function Navbar() {

  const today = new Date();

  const formattedDate =
    today.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  return (

    <header className="navbar">

      <div className="navbar-left">

        <h1>Analytics</h1>

      </div>

      <div className="navbar-center">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search expenses..."
          />

        </div>

      </div>

      <div className="navbar-right">

        <Button className="notification-btn">

          <FaBell />

          <span className="notification-dot"></span>

        </Button>

        <div className="connection-status">

          <span className="online-dot"></span>

          Synced

        </div>

        <div className="navbar-date">

          {formattedDate}

        </div>

      </div>

    </header>

  );

}

export default Navbar;