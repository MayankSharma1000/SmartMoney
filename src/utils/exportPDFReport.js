import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  safeArray,
  safeNumber,
  formatDate,
} from "./reportHelpers";

export const exportPDFReport = ({
  dashboardData = {},
  budget = {},
  budgetStats = {},
  expenses = [],
  insights = [],
}) => {
  const doc = new jsPDF();

  const safeExpenses = safeArray(expenses);
  const safeInsights = safeArray(insights);

  doc.setFontSize(20);
  doc.text("SmartMoney Financial Report", 14, 18);

  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString("en-IN")}`,
    14,
    28
  );

  /* ---------- Financial Summary ---------- */

  autoTable(doc, {
    startY: 38,
    head: [["Metric", "Value"]],
    body: [
      [
        "Total Expenses",
        `Rs. ${safeNumber(
          dashboardData.totalExpenses
        ).toLocaleString("en-IN")}`,
      ],
      [
        "Total Savings",
        `Rs. ${safeNumber(
          dashboardData.totalSavings
        ).toLocaleString("en-IN")}`,
      ],
      [
        "Investment Value",
        `Rs. ${safeNumber(
          dashboardData.currentInvestmentValue
        ).toLocaleString("en-IN")}`,
      ],
      [
        "Investment Profit",
        `Rs. ${safeNumber(
          dashboardData.investmentProfit
        ).toLocaleString("en-IN")}`,
      ],
      [
        "Savings Rate",
        `${safeNumber(
          dashboardData.savingsRate
        )}%`,
      ],
      [
        "Health Score",
        `${safeNumber(
          dashboardData.financialHealthScore
        )}/100`,
      ],
      [
        "Monthly Budget",
        `Rs. ${safeNumber(
          budget?.monthlyBudget
        ).toLocaleString("en-IN")}`,
      ],
      [
        "Budget Used",
        `${safeNumber(
          budgetStats.percentageUsed
        )}%`,
      ],
      [
        "Remaining Budget",
        `Rs. ${safeNumber(
          budgetStats.remaining
        ).toLocaleString("en-IN")}`,
      ],
    ],
  });

  /* ---------- Smart Insights ---------- */

  if (safeInsights.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 12,
      head: [["Smart Insights"]],
      body: safeInsights.map((item) => [
        typeof item === "string"
          ? item
          : JSON.stringify(item),
      ]),
    });
  }

  /* ---------- Expenses ---------- */

  if (safeExpenses.length > 0) {
    const previousTableEnd =
      doc.lastAutoTable?.finalY || 38;

    autoTable(doc, {
      startY: previousTableEnd + 12,
      head: [
        [
          "Title",
          "Category",
          "Amount",
          "Date",
          "Payment",
        ],
      ],
      body: safeExpenses.map((expense) => [
        expense?.title || "Untitled",
        expense?.category || "Uncategorized",
        `Rs. ${safeNumber(
          expense?.amount
        ).toLocaleString("en-IN")}`,
        formatDate(expense?.date),
        expense?.paymentMethod || "N/A",
      ]),
    });
  }

  doc.save("smartmoney-financial-report.pdf");
};
