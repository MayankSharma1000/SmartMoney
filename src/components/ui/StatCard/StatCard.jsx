import "./StatCard.css";

import Badge from "../Badge";
import Card from "../Card";
import IconBox from "@/components/ui/IconBox";

function StatCard({

    title,

    value,

    subtitle,

    icon,

    trend,

    trendType = "neutral"

}) {

    return (

        <Card className="stat-card">

            <div className="stat-card-header">

                <div>

                    <p className="stat-title">

                        {title}

                    </p>

                    <h2 className="stat-value">

                        {value}

                    </h2>

                </div>

                <IconBox>

                    {icon}

                </IconBox>

            </div>

            <div className="stat-card-footer">

                <p className="stat-subtitle">

                    {subtitle}

                </p>

                {

                    trend && (

                        <Badge
                            variant={trendType}
                        >

                            {trend}

                        </Badge>

                    )

                }

            </div>

        </Card>

    );

}

export default StatCard;
