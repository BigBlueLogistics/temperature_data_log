import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { WarehouseEntity } from "@/entities/warehouse";
import { TPropsAutocompleteWarehouse } from "./types";

function AutocompleteWarehouse({
  options,
  value,
  onChange,
}: TPropsAutocompleteWarehouse) {
  const filterOptions = createFilterOptions<WarehouseEntity>({
    matchFrom: "any",
    stringify: (option) => option.name,
  });

  return (
    <Autocomplete
      id="warehouse-select"
      noOptionsText="No warehouse"
      sx={{ width: 300 }}
      filterOptions={filterOptions}
      onChange={(e, selectedValue, reason) => onChange(selectedValue, reason)}
      options={options}
      value={value}
      autoHighlight
      getOptionLabel={(option) => option.name ?? option}
      renderInput={(params) => (
        <TextField
          key={params.id}
          {...params}
          label="Select warehouse"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-warehouse",
          }}
        />
      )}
    />
  );
}

export default AutocompleteWarehouse;
