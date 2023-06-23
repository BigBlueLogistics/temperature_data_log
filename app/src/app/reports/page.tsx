"use client";

import { useState } from "react";
import ReportsTemplate from "@/components/ReportsTemplate";
import getAvgTemp from "@/services/reports/avg_temperature";
import { writeExcel } from "@/lib/excel";
import { TPropsReports } from "./types";
import miscData from "./miscData";

function Reports({ searchParams }: TPropsReports) {
  const { columns } = miscData();
  const { warehouseNo, location, recordedAt } = searchParams || {};

  const [reportsData, setReportsData] = useState<any[]>([]);

  const onFilter = async (arg: TPropsReports["searchParams"]) => {
    const res = await getAvgTemp(arg);
    if (res.status === "succeeded") {
      setReportsData(res.data);
    }
  };

  const onExport = async (
    warehouse: string | undefined,
    location: string | undefined
  ) => {
    const buffer = writeExcel({
      columns: [
        { key: "warehouse", header: "Warehouse" },
        { key: "location", header: "Location" },
        { key: "celsius", header: "Temperature" },
        { key: "created_at", header: "Recorded at" },
      ],
      data: reportsData,
      filename: "reports",
      sheetname: "Temperature",
    });

    let filename = "Temperature";
    if (warehouse) {
      filename += `-${warehouse}`;
    }
    if (location) {
      filename += `-${location}`;
    }

    buffer.then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <ReportsTemplate
      data={reportsData}
      columns={columns}
      onFilter={onFilter}
      onExport={onExport}
    />
  );
}

export default Reports;
