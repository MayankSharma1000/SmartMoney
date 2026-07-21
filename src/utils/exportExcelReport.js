import ExcelJS from "exceljs";

import {
  safeArray,
  safeNumber,
  formatDate,
} from "./reportHelpers";

export const exportExcelReport = async ({
  dashboardData = {},
  budget = {},
  budgetStats = {},
  expenses = [],
  insights = [],
}) => {
  try {
    const safeExpenses = safeArray(expenses);
    const safeInsights = safeArray(insights);

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "SmartMoney";
    workbook.created = new Date();

    /* =====================================
       SUMMARY SHEET
    ===================================== */

    const summarySheet =
      workbook.addWorksheet("Summary");

    summarySheet.columns = [
      {
        header: "Metric",
        key: "metric",
        width: 28,
      },
      {
        header: "Value",
        key: "value",
        width: 24,
      },
    ];

    summarySheet.addRows([
      {
        metric: "Total Expenses",
        value: safeNumber(
          dashboardData.totalExpenses
        ),
      },
      {
        metric: "Total Savings",
        value: safeNumber(
          dashboardData.totalSavings
        ),
      },
      {
        metric: "Investment Value",
        value: safeNumber(
          dashboardData.currentInvestmentValue
        ),
      },
      {
        metric: "Investment Profit",
        value: safeNumber(
          dashboardData.investmentProfit
        ),
      },
      {
        metric: "Savings Rate",
        value: `${safeNumber(
          dashboardData.savingsRate
        )}%`,
      },
      {
        metric: "Health Score",
        value: `${safeNumber(
          dashboardData.financialHealthScore
        )}/100`,
      },
      {
        metric: "Monthly Budget",
        value: safeNumber(
          budget?.monthlyBudget
        ),
      },
      {
        metric: "Budget Used",
        value: `${safeNumber(
          budgetStats.percentageUsed
        )}%`,
      },
      {
        metric: "Remaining Budget",
        value: safeNumber(
          budgetStats.remaining
        ),
      },
    ]);

    /* =====================================
       EXPENSES SHEET
    ===================================== */

    const expensesSheet =
      workbook.addWorksheet("Expenses");

    expensesSheet.columns = [
      {
        header: "Title",
        key: "title",
        width: 24,
      },
      {
        header: "Category",
        key: "category",
        width: 20,
      },
      {
        header: "Amount",
        key: "amount",
        width: 16,
      },
      {
        header: "Date",
        key: "date",
        width: 18,
      },
      {
        header: "Payment",
        key: "payment",
        width: 20,
      },
      {
        header: "Note",
        key: "note",
        width: 35,
      },
    ];

    safeExpenses.forEach((expense) => {
      expensesSheet.addRow({
        title:
          expense?.title || "Untitled",
        category:
          expense?.category ||
          "Uncategorized",
        amount: safeNumber(
          expense?.amount
        ),
        date: formatDate(
          expense?.date
        ),
        payment:
          expense?.paymentMethod ||
          "N/A",
        note:
          expense?.note || "",
      });
    });

    /* =====================================
       INSIGHTS SHEET
    ===================================== */

    const insightsSheet =
      workbook.addWorksheet("Insights");

    insightsSheet.columns = [
      {
        header: "No.",
        key: "number",
        width: 10,
      },
      {
        header: "Insight",
        key: "insight",
        width: 80,
      },
    ];

    safeInsights.forEach(
      (item, index) => {
        insightsSheet.addRow({
          number: index + 1,
          insight:
            typeof item === "string"
              ? item
              : JSON.stringify(item),
        });
      }
    );

    /* =====================================
       BASIC WORKSHEET FORMATTING
    ===================================== */

    [
      summarySheet,
      expensesSheet,
      insightsSheet,
    ].forEach((sheet) => {
      const headerRow = sheet.getRow(1);

      headerRow.font = {
        bold: true,
      };

      headerRow.alignment = {
        vertical: "middle",
      };

      sheet.views = [
        {
          state: "frozen",
          ySplit: 1,
        },
      ];
    });

    /* =====================================
       GENERATE & DOWNLOAD FILE
    ===================================== */

    const buffer =
      await workbook.xlsx.writeBuffer();

    const blob = new Blob(
      [buffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "smartmoney-financial-report.xlsx";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "Failed to export Excel report:",
      error
    );

    throw error;
  }
};
