import { WithId } from "mongodb";
import { TResponse } from "./response";

export type AvgTempEntity = WithId<{
  celsius: number;
  warehouse: string;
  location: string;
  created_at: Date;
}>;

export type ResponseAvgTempEntity = TResponse<AvgTempEntity>;
