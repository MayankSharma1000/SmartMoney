import "./InvestmentCard.css";

import {
    FaArrowTrendDown,
    FaArrowTrendUp
} from "react-icons/fa6";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";

function InvestmentCard({

  investment,

  onEdit,

  onDelete

}) {

  const {

    name,

    type,

    currentValue,

    investedAmount,

    platform

  } = investment;

  const profit = currentValue - investedAmount;

  const isProfit = profit >= 0;

  return (

    <Card className="investment-card">

      <div className="investment-header">

        <div>

          <h3>{name}</h3>

          <p>{platform}</p>

        </div>

        <IconBox
          color={isProfit ? "success" : "danger"}
        >

          {

            isProfit
              ? <FaArrowTrendUp />
              : <FaArrowTrendDown />

          }

        </IconBox>

      </div>

      <div className="investment-body">

        <div className="investment-row">

          <span>Type</span>

          <Badge variant="primary">

            {type}

          </Badge>

        </div>

        <div className="investment-row">

          <span>Invested</span>

          <strong>

            ₹{investedAmount.toLocaleString("en-IN")}

          </strong>

        </div>

        <div className="investment-row">

          <span>Current</span>

          <strong>

            ₹{currentValue.toLocaleString("en-IN")}

          </strong>

        </div>

        <div className="investment-row">

          <span>

            Profit / Loss

          </span>

          <strong
            className={
              isProfit
                ? "profit"
                : "loss"
            }
          >

            ₹{Math.abs(profit).toLocaleString("en-IN")}

          </strong>

        </div>

      </div>

      <div className="investment-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(investment)}
        >

          Edit

        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(investment._id)}
        >

          Delete

        </button>

      </div>

    </Card>

  );

}

export default InvestmentCard;
