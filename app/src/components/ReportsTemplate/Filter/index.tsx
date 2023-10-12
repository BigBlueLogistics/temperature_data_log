import { useState, forwardRef } from "react";
import {
  Box,
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  TextFieldProps,
} from "@mui/material";
import AutocompleteLocation from "../AutocompleteLocation";
import AutocompleteWarehouse from "../AutocompleteWarehouse";
import DatePicker from "react-datepicker";
import { TPropsFilter } from "./types";
import { TPropsReports } from "@/app/reports/types";

function Filter({
  values,
  warehouseList,
  locationList,
  isLoadingData,
  onWarehouse,
  onLocation,
  onRecordedAt,
  onFilter,
}: TPropsFilter) {
  const [recordedAt, setRecordedAt] = useState<Date[] | []>([]);

  const onSelectDates = (dates: [Date, Date]) => {
    onRecordedAt(dates);
    setRecordedAt(dates);
  };

  const formatFilterVal = () => {
    let filterValues = null;
    if (values.warehouseNo) {
      filterValues = { warehouseNo: values.warehouseNo.tag_id };
    }
    if (values.location) {
      filterValues = {
        ...filterValues,
        location: values.location._id,
      };
    }
    if (values.recordedAt?.length) {
      const formatRecordedAt = [
        values.recordedAt[0].toLocaleString(),
        values.recordedAt[1].toLocaleString(),
      ];
      filterValues = {
        ...filterValues,
        recordedAt: JSON.stringify(formatRecordedAt),
      };
    }
    return filterValues as TPropsReports["searchParams"];
  };

  const DateInput = forwardRef<HTMLDivElement, TextFieldProps>(
    ({ value, onClick }, ref) => (
      <TextField label="Dates" onClick={onClick} ref={ref} value={value} />
    )
  );
  DateInput.displayName = "DateInput";

  return (
    <Box
      sx={{
        padding: "10px",
        marginTop: "20px",
        background: "rgb(240, 242, 245)",
        borderTop: "2px solid rgb(206, 212, 218)",
      }}
    >
      <Grid container spacing={2}>
        <Grid>
          <AutocompleteWarehouse
            options={warehouseList}
            onChange={onWarehouse}
            value={values.warehouseNo}
          />
        </Grid>
        <Grid>
          <AutocompleteLocation
            options={locationList}
            onChange={onLocation}
            value={values.location}
          />
        </Grid>
        <Grid>
          <DatePicker
            selectsRange
            monthsShown={2}
            onChange={onSelectDates}
            selected={recordedAt[0]}
            startDate={recordedAt[0]}
            endDate={recordedAt[1]}
            isClearable
            customInput={<DateInput value={recordedAt} />}
          />
        </Grid>
        <Grid>
          <Button
            onClick={() => onFilter(formatFilterVal())}
            variant="contained"
            color="primary"
            sx={{ pointerEvents: isLoadingData ? "none" : "auto" }}
          >
            {isLoadingData ? "Loading..." : "Search"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Filter;
