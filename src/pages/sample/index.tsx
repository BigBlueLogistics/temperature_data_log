import dynamic from "next/dynamic";

const Stream = dynamic(() => import("../../components/Stream"), { ssr: false });

function Sample() {
  return <Stream />;
}

export default Sample;
