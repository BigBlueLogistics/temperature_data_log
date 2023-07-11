import { WithId } from "mongodb";
import { TResponse } from "./response";

export type AvgTempEntity = WithId<{
  celsius: number;
  warehouse_tag: string;
  name: string;
  created_at: Date;
}>;

export type ResponseAvgTempEntity = TResponse<AvgTempEntity>;
