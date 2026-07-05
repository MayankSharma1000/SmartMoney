import React from "react";
import { motion } from "framer-motion";

function StepCard({ children }) {
  return (
    <motion.div
      className="onboarding-card"
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

export default StepCard;