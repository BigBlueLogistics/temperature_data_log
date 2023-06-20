import { WithId } from "mongodb";

export type ReportEntity = WithId<{
  celsius: number;
  warehouse: string;
  location: string;
  created_at: Date;
}>;
