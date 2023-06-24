import { ColumnDef } from "@tanstack/react-table";

export type TPropsDataTable<TColumn = any, TData = any> = {
  columns: ColumnDef<TColumn>[];
  data: Array<TData>;
};
