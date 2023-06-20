import { ColumnDef } from "@tanstack/react-table";
import { TColumnFields } from "./types";

export default function miscData() {
  const columns: ColumnDef<TColumnFields>[] = [
    {
      id: "location",
      accessorKey: "location",
      header: "Location",
    },
    {
      id: "warehouse",
      accessorKey: "warehouse",
      header: "Warehouse",
    },
    {
      id: "celsius",
      accessorKey: "celsius",
      header: "Temperature °C",
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      header: "Recorded at",
    },
  ];

  return {
    columns,
  };
}

// export const data = JSON.stringify(miscData());
