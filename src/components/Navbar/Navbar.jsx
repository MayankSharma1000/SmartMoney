import React from "react";
import "../../styles/Navbar.css";

import {
  FaBell
} from "react-icons/fa";

function Navbar() {

  return (

    <header className="navbar">

      <div className="navbar-spacer"></div>

      <div className="navbar-actions">

        <button
          className="notification-btn"
          aria-label="Notifications"
        >
          <FaBell />

          <span className="notification-dot"></span>

        </button>

      </div>

    </header>

  );

}

export default Navbar;