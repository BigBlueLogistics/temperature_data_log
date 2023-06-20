import { WithId } from "mongodb";

export type TColumnFields = WithId<{
  celsius: number;
  warehouse: string;
  location: string;
  created_at: Date;
}>;

export type TPropsReports = {
  searchParams: {
    warehouseNo?: string;
    roomId?: string;
    fromDate?: Date;
    toDate?: Date;
  };
};
