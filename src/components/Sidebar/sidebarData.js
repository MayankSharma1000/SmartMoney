import {
    FaChartPie,
    FaReceipt,
    FaChartLine,
    FaPiggyBank,
    FaCalendarAlt,
    FaUser,
    FaHeadset
  } from "react-icons/fa";
  
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FaChartPie
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: FaReceipt
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: FaChartLine
    },
    {
      name: "Savings",
      path: "/savings",
      icon: FaPiggyBank
    },
    {
      name: "Investments",
      path: "/investments",
      icon: FaChartLine
    },
    {
      name: "Recurring",
      path: "/recurring",
      icon: FaCalendarAlt
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FaUser
    },
    {
      name: "Support",
      path: "/support",
      icon: FaHeadset
    }
  ];
  
  export default sidebarItems;