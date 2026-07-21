import Card from "@/components/ui/Card";

import "@/styles/dashboard/financial-widget.css";
import "./SavingsProgress.css";

import { FaPiggyBank } from "react-icons/fa";

function SavingsProgress() {

    const currentAmount = 74200;
    const targetAmount = 100000;

    const progress = Math.round(
        (currentAmount / targetAmount) * 100
    );

    const remainingAmount =
        targetAmount - currentAmount;

    return (

        <Card
            elevated
            className="financial-widget savings-card"
        >

            {/* Header */}

            <div className="widget-header">

                <div className="savings-icon">
                    <FaPiggyBank />
                </div>

                <div className="widget-heading">

                    <h3 className="widget-title">
                        Emergency Fund
                    </h3>

                    <p className="widget-subtitle">
                        Financial safety reserve
                    </p>

                    <span className="widget-pill success">

                        On Track

                    </span>

                </div>

            </div>

            {/* Value */}

            <div className="widget-value">

                ₹{currentAmount.toLocaleString("en-IN")}

            </div>

            {/* Progress */}

            <div className="widget-progress-wrapper">

                <div className="widget-progress">

                    <div
                        className="savings-progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <div className="widget-progress-info">

                    <span>

                        {progress}% Complete

                    </span>

                    <span>

                        Goal ₹{targetAmount.toLocaleString("en-IN")}

                    </span>

                </div>

            </div>

            {/* Metrics */}

            <div className="widget-metrics">

                <div className="widget-metric">

                    <span className="widget-metric-label">

                        Saved

                    </span>

                    <strong className="widget-metric-value">

                        ₹{currentAmount.toLocaleString("en-IN")}

                    </strong>

                </div>

                <div className="widget-metric">

                    <span className="widget-metric-label">

                        Remaining

                    </span>

                    <strong className="widget-metric-value">

                        ₹{remainingAmount.toLocaleString("en-IN")}

                    </strong>

                </div>

            </div>

            {/* Footer */}

            <div className="widget-footer">

                🎯 Target ₹{targetAmount.toLocaleString("en-IN")}

            </div>

        </Card>

    );

}

export default SavingsProgress;
