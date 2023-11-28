import dynamicImport from "next/dynamic";
import { listRoom } from "@/services";
import { TPropsTemperature } from "./types";

export const dynamic = "force-dynamic";

const GaugeList = dynamicImport(() => import("../../../components/GaugeList"), {
  ssr: false,
});

async function Temperature({ params }: TPropsTemperature) {
  const { wh_tag } = params;
  const room = await listRoom(wh_tag);

  const objRoom = room.data.reduce((prev, current) => {
    const { _id, name } = current;
    const id = _id.toString();

    const formatObj = { [id]: { name, temperature: null } };
    Object.assign(prev, formatObj);
    return prev;
  }, {});

  const initialRoomData = objRoom || {};
  return <GaugeList initialTemp={initialRoomData} />;
}

export default Temperature;
