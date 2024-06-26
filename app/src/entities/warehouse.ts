import { WithId } from "mongodb";
import { TResponse } from "./response";

export type WarehouseEntity = WithId<{
  name: string;
  tag_id: string;
  is_delete: boolean;
}>;

export type ResponseWarehouseEntity = TResponse<WarehouseEntity>;
