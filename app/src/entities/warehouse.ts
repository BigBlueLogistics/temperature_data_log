import { WithId } from "mongodb";

export type WarehouseEntity = WithId<{
  name: string;
  tag_id: string;
}>;
