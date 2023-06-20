import { AutocompleteChangeReason } from "@mui/material";
import { TFilterValues } from "../types";
import { WarehouseEntity } from "@/entities/warehouse";

export type TPropsFilter = {
  values: TFilterValues;
  onWarehouse: (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
};
