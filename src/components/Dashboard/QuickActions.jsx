import {
  FaChartLine,
  FaFileExport,
  FaPiggyBank,
  FaPlusCircle
} from "react-icons/fa";
import "./QuickActions.css";

const actions = [
  {
    title: "Add Expense",
    subtitle: "Track today's spending",
    icon: <FaPlusCircle />
  },
  {
    title: "Add Savings",
    subtitle: "Grow your future",
    icon: <FaPiggyBank />
  },
  {
    title: "Add Investment",
    subtitle: "Monitor wealth",
    icon: <FaChartLine />
  },
  {
    title: "Export Reports",
    subtitle: "PDF & Excel",
    icon: <FaFileExport />
  }
];

function QuickActions() {
  return (
    <div className="quick-grid">

        {actions.map((action) => (

          <div
            className="quick-card"
            key={action.title}
          >

            <div className="quick-icon">

              {action.icon}

            </div>

            <h3>

              {action.title}

            </h3>

            <p>

              {action.subtitle}

            </p>

          </div>

        ))}
      </div>
  );
}

export default QuickActions;
