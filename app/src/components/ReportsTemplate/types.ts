import { AutocompleteChangeReason } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { AvgTempEntity } from "@/entities/avgTemperature";
import { WarehouseEntity } from "@/entities/warehouse";
import { LocationEntity } from "@/entities/location";
import { TPropsReports, TFilterValues } from "@/app/reports/types";

export type TPropsReportsTemplate = {
  data: AvgTempEntity[];
  warehouseList: WarehouseEntity[];
  locationList: LocationEntity[];
  columns: ColumnDef<AvgTempEntity>[];
  filterValues: TFilterValues;
  isLoadingData: boolean;
  onFilter: (keys: TPropsReports["searchParams"]) => void;
  onExport: (
    warehouse: string | undefined,
    location: string | undefined
  ) => void;

  onLocation: (
    value: LocationEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
  onWarehouse: (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
  onRecordedAt: (dates: [Date, Date]) => void;
};
