import { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import { LocationEntity } from "@/entities/location";

export type TPropsAutocompleteLocation = {
  options: LocationEntity[];
  onChange: (
    value: LocationEntity | null,
    reason: AutocompleteChangeReason
  ) => void;
  value: LocationEntity | null;
};
