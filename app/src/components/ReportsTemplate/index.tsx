"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  AutocompleteChangeReason,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DataTable from "@/components/DataTable";
import Filter from "./Filter";
import { TFilterValues, TPropsReportsTemplate } from "./types";
import { LocationEntity } from "@/entities/location";
import { WarehouseEntity } from "@/entities/warehouse";

function ReportsTemplate({ columns, data, onFilter }: TPropsReportsTemplate) {
  const [filterValues, setFilterValues] = useState<TFilterValues>({
    location: null,
    warehouseNo: null,
    recordedAt: null,
  });

  const onLocation = (
    value: LocationEntity | null,
    reason: AutocompleteChangeReason
  ) => {
    setFilterValues((prev) => {
      if (reason === "selectOption") {
        return { ...prev, location: value };
      } else if (reason === "clear") {
        return { ...prev, location: null };
      }
      return prev;
    });
  };

  const onWarehouse = (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => {
    setFilterValues((prev) => {
      if (reason === "selectOption") {
        return { ...prev, warehouseNo: value };
      } else if (reason === "clear") {
        return { ...prev, warehouseNo: null };
      }
      return prev;
    });
  };

  const onRecordedAt = (dates: [Date, Date] | null) => {
    let dateRange = dates;
    if (dateRange && dateRange.every((value) => value === null)) {
      dateRange = null;
    }
    setFilterValues((prev) => ({
      ...prev,
      recordedAt: dateRange,
    }));
  };

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
        <Button startIcon={<FileDownloadIcon />} variant="text">
          Export
        </Button>
      </Box>

      <Filter
        values={filterValues}
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
