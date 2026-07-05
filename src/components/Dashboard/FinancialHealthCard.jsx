import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

function FinancialHealthCard({
    score,
    label
}){

    return(

        <motion.div
            className="financial-health-card"
            initial={{opacity:0,y:25}}
            animate={{opacity:1,y:0}}
        >

            <div className="health-left">

                <div className="health-icon">

                    <FaHeart/>

                </div>

                <div>

                    <span className="health-title">
                        Financial Health
                    </span>

                    <h2>{score}/100</h2>

                    <p>{label}</p>

                </div>

            </div>

            <div className="health-progress">

                <svg width="130" height="130">

                    <circle
                        cx="65"
                        cy="65"
                        r="52"
                        className="progress-bg"
                    />

                    <circle
                        cx="65"
                        cy="65"
                        r="52"
                        className="progress-bar"
                        style={{
                            strokeDashoffset:
                                327-(327*score)/100
                        }}
                    />

                </svg>

            </div>

        </motion.div>

    );

}

export default FinancialHealthCard;