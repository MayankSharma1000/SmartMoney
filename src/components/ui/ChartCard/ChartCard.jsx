import "./ChartCard.css";

import Card from "../Card";

function ChartCard({

    title,

    subtitle,

    action,

    children

}){

    return(

        <Card className="chart-card">

            <div className="chart-card-header">

                <div>

                    <h3>

                        {title}

                    </h3>

                    {

                        subtitle &&

                        <p>

                            {subtitle}

                        </p>

                    }

                </div>

                {

                    action &&

                    <div>

                        {action}

                    </div>

                }

            </div>

            <div className="chart-card-body">

                {children}

            </div>

        </Card>

    );

}

export default ChartCard;
