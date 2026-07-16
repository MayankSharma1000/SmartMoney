import MonthlyOverview from "./widgets/MonthlyOverview";
import TopSpending from "./widgets/TopSpending";

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
