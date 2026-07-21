import {
  FaChartLine,
  FaFileExport,
  FaPiggyBank,
  FaPlus,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import ActionCard from "@/components/ui/ActionCard";

import "./QuickActions.css";

const actions = [
  {
    title: "Add Expense",
    subtitle: "Record spending",
    icon: <FaPlus />,
    color: "blue",
    type: "expense",
  },
  {
    title: "Add Savings",
    subtitle: "Grow wealth",
    icon: <FaPiggyBank />,
    color: "green",
    type: "savings",
  },
  {
    title: "Invest",
    subtitle: "Portfolio",
    icon: <FaChartLine />,
    color: "purple",
    type: "investment",
  },
  {
    title: "Export",
    subtitle: "PDF & Excel",
    icon: <FaFileExport />,
    color: "orange",
    type: "export",
  },
];

function QuickActions({
  onExport,
  exportLoading = false,
}) {
  const navigate = useNavigate();

  const handleAction = (type) => {
    switch (type) {
      case "expense":
        navigate("/expenses");
        break;

      case "savings":
        navigate("/savings");
        break;

      case "investment":
        navigate("/investments");
        break;

      case "export":
        if (!exportLoading && onExport) {
          onExport();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="quick-actions-bar">
      {actions.map((action) => (
        <ActionCard
          key={action.title}
          icon={action.icon}
          title={action.title}
          subtitle={
            action.type === "export" && exportLoading
              ? "Preparing report..."
              : action.subtitle
          }
          color={action.color}
          onClick={() =>
            handleAction(action.type)
          }
        />
      ))}
    </div>
  );
}

export default QuickActions;
