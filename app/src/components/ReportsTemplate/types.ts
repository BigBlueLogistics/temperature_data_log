import { ColumnDef } from "@tanstack/react-table";
import { ReportEntity } from "@/entities/reports";
import { WarehouseEntity } from "@/entities/warehouse";

export type TPropsReportsTemplate = {
  data: ReportEntity[];
  columns: ColumnDef<ReportEntity>[];
};

export type TFilterValues = {
  location: object | null;
  warehouse: WarehouseEntity | null;
};
