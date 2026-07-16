import { motion } from "framer-motion";
import "./ActionCard.css";

function ActionCard({
  icon,
  title,
  subtitle,
  onClick,
  color = "blue",
}) {
  return (
    <motion.button
      className={`action-card ${color}`}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.22,
      }}
      onClick={onClick}
    >
      <div className="action-card-icon">
        {icon}
      </div>

      <div className="action-card-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </motion.button>
  );
}

export default ActionCard;
