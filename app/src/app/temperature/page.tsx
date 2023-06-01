import dynamicImport from "next/dynamic";
import { getTemperature } from "@/services/room";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Stream = dynamicImport(() => import("../../components/Stream"), {
  ssr: false,
});

async function Temperature() {
  const room = await getTemperature();
  const initialRoomData = room || {};
  return <Stream initialTemp={initialRoomData} />;
}

export default Temperature;
