import { WarehouseEntity } from "@/entities/warehouse";
import mongodbInit from "@/lib/mongodb";

export default async function warehouseList() {
  const client = await mongodbInit;
  const db = client.db(process.env.DB_NAME);

  const warehouse = await db
    .collection<WarehouseEntity>("warehouse")
    .find({ is_delete: false })
    .project<WarehouseEntity>({
      _id: 0,
      name: true,
      tag_id: true,
      is_delete: true,
    })
    .toArray();

  return warehouse;
}
