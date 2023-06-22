import { AutocompleteChangeReason } from "@mui/material";
import { TFilterValues } from "../types";
import { LocationEntity } from "@/entities/location";
import { WarehouseEntity } from "@/entities/warehouse";
import { TPropsReports } from "@/app/reports/types";

export type TPropsFilter = {
  values: TFilterValues;
  onLocation: (
    value: LocationEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
  onWarehouse: (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
  onRecordedAt: (dates: [Date, Date]) => void;
  onFilter: (keys: TPropsReports["searchParams"]) => void;
};
