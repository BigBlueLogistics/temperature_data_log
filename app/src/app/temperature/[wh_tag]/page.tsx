import dynamicImport from "next/dynamic";
import { listRoom } from "@/services";
import { TPropsTemperature } from "./types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GaugeList = dynamicImport(() => import("../../../components/GaugeList"), {
  ssr: false,
});

async function Temperature({ params }: TPropsTemperature) {
  const { wh_tag } = params;
  const room = await listRoom({ warehouseSlug: wh_tag });

  const initialRoomData = room || {};
  return <GaugeList initialTemp={initialRoomData} />;
}

export default Temperature;
