import dynamic from "next/dynamic";
import { avgTemperature } from "@/services";
import miscData from "./miscData";
import { TPropsReports, TColumnFields } from "./types";

const DataTable = dynamic(() => import("../../components/DataTable"), {
  ssr: false,
});

async function Reports({ searchParams }: TPropsReports) {
  const { columns } = miscData();
  const { warehouseNo, roomId, fromDate, toDate } = searchParams || {};
  const res = (await avgTemperature({
    warehouseNo,
    roomId,
    fromDate,
    toDate,
  })) as TColumnFields[];

  // console.log("searchParams!!", searchParams);
  // console.log("datas!!!", columns);

  return (
    <div>
      Reports
      <DataTable columns={columns} data={res} />
    </div>
  );
}

export default Reports;
