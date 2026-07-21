import { NavLink } from "react-router-dom";
import "../../../styles/Sidebar.css";

import { FaArrowTrendUp } from "react-icons/fa6";

import {
  FaCalendarAlt,
  FaChartPie,
  FaCog,
  FaPiggyBank,
  FaReceipt,
  FaSignOutAlt,
  FaWallet,
} from "react-icons/fa";

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <FaReceipt />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartPie />,
    },
    {
      name: "Savings",
      path: "/savings",
      icon: <FaPiggyBank />,
    },
    {
      name: "Investments",
      path: "/investments",
      icon: <FaArrowTrendUp />,
    },
    {
      name: "Recurring",
      path: "/recurring",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
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

      {/* ================= FOOTER ================= */}

      <div className="sidebar-footer">

        <div className="sidebar-widget">

          <span className="widget-label">
            THIS MONTH
          </span>

          <h2>₹18,420</h2>

          <p>
            Saved{" "}
            <span className="positive">
              +12%
            </span>
          </p>

        </div>

        <div className="sidebar-divider" />

        <button className="account-button">

          <div className="account-avatar">
            M
          </div>

          <div>

            <strong>Mayank</strong>

            <span>Settings</span>

          </div>

        </button>

        <button className="sidebar-action-btn">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
