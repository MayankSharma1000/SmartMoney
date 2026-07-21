import React from "react";
import "./RecentTransactions.css";
import { categoryIcons } from "../../utils/categoryIcons";

function RecentTransactions({ transactions = [] }) {
  return (
    <div className="dashboard-widget recent-transactions">

      <div className="widget-header">

        <div>
          <h2>Recent Transactions</h2>
          <p>Your latest financial activity</p>
        </div>

        <button className="view-all-btn">
        See History →
        </button>

      </div>

      {transactions.length === 0 ? (

        <div className="empty-widget">
          <span className="empty-icon">📄</span>

          <h3>No Transactions Yet</h3>

          <p>
            Start adding expenses to build your financial history.
          </p>
        </div>

      ) : (

        transactions.slice(0, 5).map((transaction) => (

          <div
            key={transaction._id}
            className="transaction-item"
          >

            <div className="transaction-left">

              <div className="transaction-icon">

                {categoryIcons[transaction.category] ||
                  categoryIcons.Other}

              </div>

              <div>

                <h4>
                  {transaction.title || transaction.category}
                </h4>

                <span>

                  {transaction.category}

                  {" • "}

                  {new Date(
                    transaction.date
                  ).toLocaleDateString("en-IN")}

                </span>

              </div>

            </div>

            <strong className="transaction-amount">

              ₹
              {Number(
                transaction.amount || 0
              ).toLocaleString("en-IN")}

            </strong>

          </div>

        ))

      )}

    </div>
  );
}

export default RecentTransactions;
