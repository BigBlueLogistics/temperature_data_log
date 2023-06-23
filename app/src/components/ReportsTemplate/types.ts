import { ColumnDef } from "@tanstack/react-table";
import { AvgTempEntity } from "@/entities/avgTemperature";
import { LocationEntity } from "@/entities/location";
import { WarehouseEntity } from "@/entities/warehouse";
import { TPropsReports } from "@/app/reports/types";

export type TPropsReportsTemplate = {
  data: AvgTempEntity[];
  columns: ColumnDef<AvgTempEntity>[];
  onFilter: (keys: TPropsReports["searchParams"]) => void;
  onExport: (
    warehouse: string | undefined,
    location: string | undefined
  ) => void;
};

export type TFilterValues = {
  location: LocationEntity | null;
  warehouseNo: WarehouseEntity | null;
  recordedAt: [Date, Date] | null;
};
