import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

import {
  FaWallet,
  FaChartPie,
  FaReceipt,
  FaPiggyBank,
  FaChartLine,
  FaUser,
  FaCalendarAlt,
  FaHeadset,
  FaCrown,
  FaChevronRight
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
      name: "Profile",
      path: "/profile",
      icon: <FaUser />
    },
    {
      name: "Support",
      path: "/support",
      icon: <FaHeadset />
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
          <p>Expense Intelligence</p>
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

        {/* Premium Card */}

        <div className="sidebar-premium">

          <div className="premium-icon">
            <FaCrown />
          </div>

          <div className="premium-content">

            <h4>Premium Dashboard</h4>

            <p>
              AI Reports & Smart Insights
            </p>

          </div>

        </div>

        {/* User Profile */}

        <div className="sidebar-profile">

          <div className="sidebar-profile-avatar">
            MS
          </div>

          <div className="sidebar-profile-info">

            <h4>Mayank Sharma</h4>

            <p>Full Stack Developer</p>

          </div>

          <FaChevronRight
            className="profile-arrow"
          />

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;