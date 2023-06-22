"use client";

import { useState } from "react";
import ReportsTemplate from "@/components/ReportsTemplate";
import getAvgTemp from "@/services/reports/avg_temperature";
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

  return (
    <ReportsTemplate data={reportsData} columns={columns} onFilter={onFilter} />
  );
}

export default Reports;
