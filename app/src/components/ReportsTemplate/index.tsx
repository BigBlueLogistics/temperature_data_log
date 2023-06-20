"use client";

import { useState } from "react";
import { Box, Button, Paper, AutocompleteChangeReason } from "@mui/material";
import DataTable from "@/components/DataTable";
import Filter from "./Filter";
import { TFilterValues, TPropsReportsTemplate } from "./types";
import { WarehouseEntity } from "@/entities/warehouse";

function ReportsTemplate({ columns, data }: TPropsReportsTemplate) {
  const [filterValues, setFilterValues] = useState<TFilterValues>({
    location: null,
    warehouse: null,
  });

  const onWarehouse = (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => {
    setFilterValues((prev) => {
      if (reason === "selectOption") {
        return { ...prev, warehouse: value };
      } else if (reason === "clear") {
        return { ...prev, warehouse: null };
      }
      return prev;
    });
  };

  return (
    <Box component={Paper} sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          marginX: "15px",
          marginTop: "-24px",
          padding: "20px 10px",
          borderRadius: "5px",
          background:
            "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
          boxShadow:
            "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
        }}
      >
        Header
        <Button>Export</Button>
      </Box>

      <Filter values={filterValues} onWarehouse={onWarehouse} />

      <DataTable columns={columns} data={data} />
    </Box>
  );
}

export default ReportsTemplate;
