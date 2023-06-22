import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { LocationEntity } from "@/entities/location";
import { TPropsAutocompleteLocation } from "./types";

function AutocompleteLocation({
  options,
  value,
  onChange,
}: TPropsAutocompleteLocation) {
  const filterOptions = createFilterOptions<LocationEntity>({
    matchFrom: "any",
    stringify: (option) => option.name,
  });

  return (
    <Autocomplete
      id="location-select"
      noOptionsText="No location"
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
          label="Select location"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-location",
          }}
        />
      )}
    />
  );
}

export default AutocompleteLocation;
