import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

import {
  FaWallet,
  FaChartPie,
  FaReceipt,
  FaPiggyBank,
  FaChartLine,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaTrashAlt,
  FaHeartbeat
} from "react-icons/fa";

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <FaReceipt />
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartLine />
    },
    {
      name: "Savings",
      path: "/savings",
      icon: <FaPiggyBank />
    },
    {
      name: "Investments",
      path: "/investments",
      icon: <FaChartLine />
    },
    {
      name: "Recurring",
      path: "/recurring",
      icon: <FaCalendarAlt />
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />
    }
  ];

  return (
    <aside className="sidebar">

      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          <FaWallet />
        </div>

        <div>
          <h2>SmartMoney</h2>
          <p>Personal Finance OS</p>
        </div>

      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="sidebar-nav">

        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {item.icon}

            <span>{item.name}</span>

          </NavLink>
        ))}

      </nav>

      {/* ================= SIDEBAR FOOTER ================= */}
      <div className="sidebar-footer">
        <div className="financial-health-card">
          <FaHeartbeat className="health-icon" />
          <div>
            <span>Financial Health</span>
            <h3>87 / 100</h3>
            <small>Excellent</small>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="sidebar-action-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

          <button className="sidebar-action-btn danger">
            <FaTrashAlt />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
      </aside>
    );
}

export default Sidebar;