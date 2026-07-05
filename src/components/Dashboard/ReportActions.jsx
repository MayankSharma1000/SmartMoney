import React from "react";
import Button from "../ui/Button/Button";

function ReportActions({
  reportData,
  exportPDFReport,
  exportExcelReport
}) {
  return (
    <div className="report-actions">
      <Button
        variant="secondary"
        onClick={() => exportPDFReport(reportData)}
      >
        Export PDF
      </Button>

      <Button
        variant="secondary"
        onClick={() => exportExcelReport(reportData)}
      >
        Export Excel
      </Button>
    </div>
  );
}

export default ReportActions;