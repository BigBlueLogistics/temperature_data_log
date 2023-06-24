"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DataTable from "@/components/DataTable";
import Filter from "./Filter";
import { TPropsReportsTemplate } from "./types";

function ReportsTemplate({
  columns,
  data,
  warehouseList,
  locationList,
  filterValues,
  onLocation,
  onWarehouse,
  onRecordedAt,
  onFilter,
  onExport,
}: TPropsReportsTemplate) {
  return (
    <Box component={Paper} sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          marginX: "15px",
          justifyContent: "space-between",
          marginTop: "-24px",
          padding: "20px 10px",
          borderRadius: "5px",
          background:
            "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
          boxShadow:
            "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
        }}
      >
        <Typography display="flex" alignItems="center" color="">
          Temperature:
          <Typography variant="h5" component="span" paddingX={1}>
            {data.length || 0}
          </Typography>
          records found.
        </Typography>
        <Button
          startIcon={<FileDownloadIcon />}
          variant="text"
          onClick={() =>
            onExport(
              filterValues.warehouseNo?.name,
              filterValues.location?.name
            )
          }
        >
          Export
        </Button>
      </Box>

      <Filter
        values={filterValues}
        warehouseList={warehouseList}
        locationList={locationList}
        onWarehouse={onWarehouse}
        onLocation={onLocation}
        onRecordedAt={onRecordedAt}
        onFilter={onFilter}
      />

      <DataTable columns={columns} data={data} />
    </Box>
  );
}

export default ReportsTemplate;
