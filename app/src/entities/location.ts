import { WithId } from "mongodb";
import { TResponse } from "./response";

export type LocationEntity = WithId<{
  name: string;
  warehouse_tag: string;
}>;

export type ResponseLocationEntity = TResponse<LocationEntity>;
