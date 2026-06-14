import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaWallet,
  FaChartPie,
  FaReceipt,
  FaPiggyBank,
  FaChartLine,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext.jsx";

function Sidebar() {
  const { logout } = useAuth();

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
      name: "Profile",
      path: "/profile",
      icon: <FaUser />
    },
    {
        name: "Recurring",
        path: "/recurring",
        icon: <FaWallet />
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <FaWallet />
        </div>

        <div>
          <h2>SmartMoney</h2>
          <p>Expense Intelligence</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;