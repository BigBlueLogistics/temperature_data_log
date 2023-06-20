import dynamic from "next/dynamic";
import { avgTemperature } from "@/services";
import { TPropsReports } from "./types";
import miscData from "./miscData";

const ReportsTemplate = dynamic(
  () => import("../../components/ReportsTemplate"),
  {
    ssr: false,
  }
);

async function Reports({ searchParams }: TPropsReports) {
  const { columns } = miscData();
  const { warehouseNo, roomId, fromDate, toDate } = searchParams || {};
  const dataTemp = await avgTemperature({
    warehouseNo,
    roomId,
    fromDate,
    toDate,
  });

  // console.log("searchParams!!", searchParams);
  // console.log("datas!!!", columns);

  return <ReportsTemplate data={dataTemp} columns={columns} />;
}

export default Reports;
