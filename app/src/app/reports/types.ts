import { LocationEntity } from "@/entities/location";
import { WarehouseEntity } from "@/entities/warehouse";

export type TPropsReports = {
  searchParams: {
    warehouseNo?: string;
    location?: string;
    recordedAt?: [Date, Date];
  };
};

export type TFilterValues = {
  location: LocationEntity | null;
  warehouseNo: WarehouseEntity | null;
  recordedAt: [Date, Date] | null;
};
