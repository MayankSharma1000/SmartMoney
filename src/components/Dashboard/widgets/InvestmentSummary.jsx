import Card from "@/components/ui/Card";

import "@/styles/dashboard/financial-widget.css";
import "./InvestmentSummary.css";

import { FaArrowTrendUp } from "react-icons/fa6";

function InvestmentSummary() {

    const portfolioValue = 142800;
    const investedAmount = 130350;
    const profit = 12450;
    const returns = 9.6;

    const progress = Math.min(
        returns * 10,
        100
    );

    return (

        <Card
            elevated
            className="financial-widget investment-card"
        >

            <div className="widget-header">

                <div className="investment-icon">

                    <FaArrowTrendUp />

                </div>

                <div className="widget-heading">

                    <h3 className="widget-title">

                        Investment Portfolio

                    </h3>

                    <p className="widget-subtitle">

                        Long-term wealth growth

                    </p>

                    <span className="widget-pill success">

                        Growing

                    </span>

                </div>

            </div>

            <div className="widget-value">

                ₹{portfolioValue.toLocaleString("en-IN")}

            </div>

            <div className="widget-progress-wrapper">

                <div className="widget-progress">

                    <div
                        className="investment-progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <div className="widget-progress-info">

                    <span>

                        {returns}% Return

                    </span>

                    <span>

                        Positive Growth

                    </span>

                </div>

            </div>

            <div className="widget-metrics">

                <div className="widget-metric">

                    <span className="widget-metric-label">

                        Invested

                    </span>

                    <strong className="widget-metric-value">

                        ₹{investedAmount.toLocaleString("en-IN")}

                    </strong>

                </div>

                <div className="widget-metric">

                    <span className="widget-metric-label">

                        Profit

                    </span>

                    <strong
                        className="widget-metric-value"
                        style={{
                            color:"var(--success)"
                        }}
                    >

                        +₹{profit.toLocaleString("en-IN")}

                    </strong>

                </div>

            </div>

            <div className="widget-footer">

                📈 Long-term investment is performing well.

            </div>

        </Card>

    );

}

export default InvestmentSummary;
