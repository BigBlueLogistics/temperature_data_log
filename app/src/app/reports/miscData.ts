import { ColumnDef } from "@tanstack/react-table";
import { AvgTempEntity } from "@/entities/avgTemperature";

export default function miscData() {
  const columns: ColumnDef<AvgTempEntity>[] = [
    {
      id: "warehouse",
      accessorKey: "warehouse",
      header: "Warehouse",
    },
    {
      id: "location",
      accessorKey: "location",
      header: "Location",
    },
    {
      id: "celsius",
      accessorKey: "celsius",
      header: "Temperature °C",
    },
    {
      id: "created_at",
      accessorFn: (row) => new Date(row.created_at).toLocaleString(),
      header: "Recorded at",
    },
  ];

  return {
    columns,
  };
}
