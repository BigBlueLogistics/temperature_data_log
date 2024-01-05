import { ResponseAvgTempEntity } from "@/entities/avgTemperature";
import { httpFetch } from "@/adapter";

type FilterParams = {
  recordedAt?: [Date, Date];
  roomId?: string;
  warehouseNo?: string;
};

export default async function getAvgTemp(
  arg: FilterParams
): Promise<ResponseAvgTempEntity> {
  const queryP = new URLSearchParams(arg as Record<string, string>).toString();
  const dataTemp = await httpFetch(`/api/reports?${queryP}`, {
    method: "GET",
  });
  return await dataTemp.json();
}
