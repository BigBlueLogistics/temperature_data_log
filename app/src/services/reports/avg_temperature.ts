import { ResponseAvgTempEntity } from "@/entities/avgTemperature";

type FilterParams = {
  recordedAt?: [Date, Date];
  roomId?: string;
  warehouseNo?: string;
};

export default async function getAvgTemp(
  arg: FilterParams
): Promise<ResponseAvgTempEntity> {
  const queryP = new URLSearchParams(arg as Record<string, string>).toString();
  const dataTemp = await fetch(`http://localhost:3100/api/reports?${queryP}`, {
    method: "GET",
  });

  if (!dataTemp.ok) {
    throw new Error("Failed to fetch reports data");
  }
  return await dataTemp.json();
}
