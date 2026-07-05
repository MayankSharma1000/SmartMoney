import React from "react";

import MonthlyOverview from "../DashboardWidgets/MonthlyOverview";
import TopSpending from "../DashboardWidgets/TopSpending";

function ChartsSection({
    dashboardData
}){

    return(

        <div className="charts-grid">

            <MonthlyOverview
                monthlyChart={
                    dashboardData.monthlyChart || []
                }
            />

            <TopSpending
                categoryChart={
                    dashboardData.categoryChart || []
                }
            />

        </div>

    );

}

export default ChartsSection;