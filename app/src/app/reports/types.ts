import { WithId } from "mongodb";
import { LocationEntity } from "@/entities/location";
import { WarehouseEntity } from "@/entities/warehouse";
import { ResponseAvgTempEntity } from "@/entities/avgTemperature";

export type TReportsData = ResponseAvgTempEntity;

export type TPropsReports = {
  searchParams: {
    warehouseNo?: string;
    location?: string;
    recordedAt?: [Date, Date];
  } | null;
};

export type TFilterValues = {
  location: LocationEntity | null;
  warehouseNo: WarehouseEntity | null;
  recordedAt: [Date, Date] | null;
};
