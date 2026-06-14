import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportPDFReport = ({
  dashboardData,
  budget,
  budgetStats,
  expenses,
  insights
}) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Smart Expense Tracker Report", 14, 18);

  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString("en-IN")}`, 14, 28);

  autoTable(doc, {
    startY: 38,
    head: [["Metric", "Value"]],
    body: [
      ["Total Expenses", `Rs. ${dashboardData.totalExpenses}`],
      ["Total Savings", `Rs. ${dashboardData.totalSavings}`],
      ["Investment Value", `Rs. ${dashboardData.currentInvestmentValue}`],
      ["Investment Profit", `Rs. ${dashboardData.investmentProfit}`],
      ["Savings Rate", `${dashboardData.savingsRate}%`],
      ["Health Score", `${dashboardData.financialHealthScore}/100`],
      ["Monthly Budget", `Rs. ${budget?.monthlyBudget || 0}`],
      ["Budget Used", `${budgetStats.percentageUsed}%`],
      ["Remaining Budget", `Rs. ${budgetStats.remaining}`]
    ]
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 12,
    head: [["Smart Insights"]],
    body: insights.map((item) => [item])
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 12,
    head: [["Title", "Category", "Amount", "Date", "Payment"]],
    body: expenses.map((expense) => [
      expense.title,
      expense.category,
      `Rs. ${expense.amount}`,
      expense.date
        ? new Date(expense.date).toLocaleDateString("en-IN")
        : "N/A",
      expense.paymentMethod || "N/A"
    ])
  });

  doc.save("smart-expense-report.pdf");
};

export const exportExcelReport = ({
  dashboardData,
  budget,
  budgetStats,
  expenses,
  insights
}) => {
  const summarySheet = [
    ["Metric", "Value"],
    ["Total Expenses", dashboardData.totalExpenses],
    ["Total Savings", dashboardData.totalSavings],
    ["Investment Value", dashboardData.currentInvestmentValue],
    ["Investment Profit", dashboardData.investmentProfit],
    ["Savings Rate", `${dashboardData.savingsRate}%`],
    ["Health Score", `${dashboardData.financialHealthScore}/100`],
    ["Monthly Budget", budget?.monthlyBudget || 0],
    ["Budget Used", `${budgetStats.percentageUsed}%`],
    ["Remaining Budget", budgetStats.remaining]
  ];

  const expenseSheet = expenses.map((expense) => ({
    Title: expense.title,
    Category: expense.category,
    Amount: expense.amount,
    Date: expense.date
      ? new Date(expense.date).toLocaleDateString("en-IN")
      : "N/A",
    Payment: expense.paymentMethod || "N/A",
    Note: expense.note || ""
  }));

  const insightSheet = insights.map((item, index) => ({
    No: index + 1,
    Insight: item
  }));

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet(summarySheet),
    "Summary"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(expenseSheet),
    "Expenses"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(insightSheet),
    "Insights"
  );

  XLSX.writeFile(workbook, "smart-expense-report.xlsx");
};