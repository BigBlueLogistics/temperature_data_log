import { ResponseLocationEntity } from "@/entities/location";
import { httpFetch } from "@/adapter";

export default async function getLocation(
  warehouseTag: string
): Promise<ResponseLocationEntity> {
  const location = await httpFetch(
    `/api/location?warehouse_tag=${warehouseTag}`,
    {
      method: "GET",
    }
  );
  return await location.json();
}
