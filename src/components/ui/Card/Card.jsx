import { motion } from "framer-motion";
import "./Card.css";

function Card({
  children,
  className = "",
  hover = true,
  compact = false,
  glass = true,
  elevated = false,
  interactive = false,
  ...props
}) {

  const classes = [
    "card",
    glass && "glass",
    compact && "compact",
    elevated && "elevated",
    interactive && "interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={classes}
      whileHover={
        hover
          ? {
              y: -6,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
