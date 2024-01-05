import dynamicImport from "next/dynamic";
import { locationList } from "@/services/internal";
import { TPropsTemperature } from "./types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GaugeList = dynamicImport(() => import("../../../components/GaugeList"), {
  ssr: false,
});

async function Temperature({ params }: TPropsTemperature) {
  const { wh_tag } = params;
  const room = await locationList({ warehouseSlug: wh_tag });

  const initialRoomData = room || {};
  return <GaugeList initialTemp={initialRoomData} />;
}

export default Temperature;
