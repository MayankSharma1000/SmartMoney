import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaWallet,
  FaChartPie,
  FaReceipt,
  FaPiggyBank,
  FaChartLine,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaHeadset
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
    </aside>
  );
}

export default Sidebar;