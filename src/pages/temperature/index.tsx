import dynamic from "next/dynamic";
import { NextPage } from "next";
import { getTemperature } from "@/services/room";

const Stream = dynamic(() => import("../../components/Stream"), { ssr: false });

type Props = {
  room: any;
};

const Temperature: NextPage<Props> = ({ room }) => {
  const initialRoomData = JSON.parse(room) || {};
  return <Stream initialTemp={initialRoomData} />;
};

export async function getServerSideProps() {
  const room = await getTemperature();
  return {
    props: {
      room: JSON.stringify(room),
    },
  };
}

export default Temperature;
