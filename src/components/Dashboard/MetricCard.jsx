import React from "react";
import { motion } from "framer-motion";

function StatCard({
    title,
    value,
    change,
    icon,
    positive = true
}) {
    return (

        <motion.div
            className="stat-card"
            whileHover={{
                y:-6
            }}
        >

            <div className="stat-top">

                <span>{title}</span>

                <div className="stat-icon">
                    {icon}
                </div>

            </div>

            <h2>{value}</h2>

            <p className={positive ? "positive":"negative"}>
                {change}
            </p>

        </motion.div>

    );
}

export default StatCard;