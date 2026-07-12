import "./InvestmentList.css";

import InvestmentCard from "./InvestmentCard";

function InvestmentList({

    investments,

    onEdit,

    onDelete

}) {

    if (investments.length === 0) {

        return (

            <div className="investment-empty">

                <h2>No Investments Yet</h2>

                <p>

                    Start investing to track your portfolio.

                </p>

            </div>

        );

    }

    return (

        <div className="investment-grid">

            {

                investments.map(

                    investment=>(

                        <InvestmentCard

                            key={investment._id}

                            investment={investment}

                            onEdit={onEdit}

                            onDelete={onDelete}

                        />

                    )

                )

            }

        </div>

    );

}

export default InvestmentList;
