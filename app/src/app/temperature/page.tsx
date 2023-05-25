import dynamic from "next/dynamic";
import { getTemperature } from "@/services/room";

const Stream = dynamic(() => import("../../components/Stream"), { ssr: false });

async function Temperature() {
  const room = await getTemperature();
  const initialRoomData = room || {};
  return <Stream initialTemp={initialRoomData} />;
}

export default Temperature;
