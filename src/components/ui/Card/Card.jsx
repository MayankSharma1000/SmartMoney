import { motion } from "framer-motion";
import "./Card.css";

function Card({
    children,
    className = "",
    hover = true
}) {

    return (
        <motion.div
            whileHover={
                hover
                    ? {
                        transition: {
                            duration: 0.2
                        }
                    }
                    : {}
            }

            className={`card ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default Card;
