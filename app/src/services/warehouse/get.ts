import { ResponseWarehouseEntity } from "@/entities/warehouse";
import { httpFetch } from "@/adapter";

export default async function getWarehouse(): Promise<ResponseWarehouseEntity> {
  const warehouse = await httpFetch("/api/warehouse", {
    method: "GET",
  });
  return await warehouse.json();
}
