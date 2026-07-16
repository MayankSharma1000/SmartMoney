import {
  FaChartLine,
  FaFileExport,
  FaPiggyBank,
  FaPlus,
} from "react-icons/fa";

import ActionCard from "@/components/ui/ActionCard";

import "./QuickActions.css";

const actions = [
  {
    title: "Add Expense",
    subtitle: "Record spending",
    icon: <FaPlus />,
    color: "blue",
  },
  {
    title: "Add Savings",
    subtitle: "Grow wealth",
    icon: <FaPiggyBank />,
    color: "green",
  },
  {
    title: "Invest",
    subtitle: "Portfolio",
    icon: <FaChartLine />,
    color: "purple",
  },
  {
    title: "Export",
    subtitle: "PDF & Excel",
    icon: <FaFileExport />,
    color: "orange",
  },
];

function QuickActions() {
  return (
    <div className="quick-actions-bar">
      {actions.map((action) => (
        <ActionCard
          key={action.title}
          icon={action.icon}
          title={action.title}
          subtitle={action.subtitle}
          color={action.color}
          onClick={() => {
            console.log(`${action.title} clicked`);
          }}
        />
      ))}
    </div>
  );
}

export default QuickActions;
