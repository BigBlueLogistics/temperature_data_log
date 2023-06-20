import { Box, Unstable_Grid2 as Grid, TextField } from "@mui/material";
import AutocompleteWarehouse from "../AutocompleteWarehouse";
import { WarehouseEntity } from "@/entities/warehouse";
import { TPropsFilter } from "./types";

function Filter({ values, onWarehouse }: TPropsFilter) {
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
            value={values.warehouse}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Filter;
