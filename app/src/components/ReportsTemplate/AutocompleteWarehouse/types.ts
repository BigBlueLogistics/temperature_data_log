import { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import { WarehouseEntity } from "@/entities/warehouse";

export type TPropsAutocompleteWarehouse = {
  options: WarehouseEntity[];
  onChange: (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
  value: WarehouseEntity | null;
};
