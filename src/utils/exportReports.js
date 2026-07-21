import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* =========================================
   HELPERS
========================================= */

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const safeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-IN");
};

/* =========================================
   PDF REPORT
========================================= */

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

/* =========================================
   EXCEL REPORT
========================================= */

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
