import "./EmptyState.css";

import { motion } from "framer-motion";

import Button from "@/components/ui/Button";

function EmptyState({
  icon,
  title,
  description,
  actionText,
  onAction,
}) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {icon && (
        <div className="empty-icon">
          {icon}
        </div>
      )}

      <h2>{title}</h2>

      <p>{description}</p>

      {actionText && (
        <Button
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
}

export default EmptyState;
