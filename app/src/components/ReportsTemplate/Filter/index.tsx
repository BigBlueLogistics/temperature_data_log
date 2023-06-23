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
import { LocationEntity } from "@/entities/location";
import { WarehouseEntity } from "@/entities/warehouse";
import { TPropsFilter } from "./types";

function Filter({
  values,
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
    let filterValues = {};
    if (values.warehouseNo) {
      filterValues = { warehouseNo: values.warehouseNo.tag_id };
    }
    if (values.location) {
      filterValues = { ...filterValues, location: values.location._id };
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
    return filterValues;
  };

  const DUMMY_WH: WarehouseEntity[] = [
    {
      _id: "11116" as any,
      name: "BB06",
      tag_id: "bb06",
    },
    {
      _id: "11117" as any,
      name: "BB07",
      tag_id: "bb07",
    },
    {
      _id: "11118" as any,
      name: "BB08",
      tag_id: "bb08",
    },
  ];

  const DUMMY_LOC: LocationEntity[] = [
    {
      _id: "647832fd02b564abe05016f4" as any,
      name: "Chiller 3",
      warehouse_tag: "bb06",
    },
    {
      _id: "647832fd02b564abe05016f5" as any,
      name: "Chiller 4",
      warehouse_tag: "bb06",
    },
    {
      _id: "647832fd02b564abe05016f6" as any,
      name: "Chiller 5",
      warehouse_tag: "bb07",
    },
  ];

  const DateInput = forwardRef<HTMLDivElement, TextFieldProps>(
    ({ value, onClick }, ref) => (
      <TextField label="Dates" onClick={onClick} ref={ref} value={value} />
    )
  );
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
            options={DUMMY_WH}
            onChange={onWarehouse}
            value={values.warehouseNo}
          />
        </Grid>
        <Grid>
          <AutocompleteLocation
            options={DUMMY_LOC}
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
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Filter;
