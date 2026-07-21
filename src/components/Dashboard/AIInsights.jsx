import Card from "@/components/ui/Card";

import "@/styles/dashboard/financial-widget.css";
import "./AIInsights.css";

import { FaLightbulb } from "react-icons/fa";

function AIInsights({ insights = [] }) {

    return (

        <Card
            elevated
            className="financial-widget ai-card"
        >

            <div className="widget-header">

                <div className="ai-icon">

                    <FaLightbulb />

                </div>

                <div className="widget-heading">

                    <h3 className="widget-title">

                        Smart Insights

                    </h3>

                    <p className="widget-subtitle">

                        AI-powered financial observations

                    </p>

                    <span className="widget-pill success">

                        Live

                    </span>

                </div>

            </div>

            <div className="insights-list">

                {insights.length === 0 ? (

                    <div className="empty-widget">

                        Add more transactions to generate AI insights.

                    </div>

                ) : (

                    insights.slice(0,3).map((insight,index)=>(

                        <div
                            key={index}
                            className="insight-card"
                        >

                            💡 {insight}

                        </div>

                    ))

                )}

            </div>

            <div className="widget-footer">

                AI updates automatically as new transactions are added.

            </div>

        </Card>

    );

}

export default AIInsights;
