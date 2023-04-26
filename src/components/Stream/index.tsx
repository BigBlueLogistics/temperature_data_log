import { useEffect } from "react";

function Stream() {
  const eventSource = new window.EventSource("/api/watcher/stream");

  useEffect(() => {
    eventSource.addEventListener("message", (event) => {
      console.log("Received message:", event.data);

      // Update the UI with the new data
    });
  }, []);
  //   console.log("Mongodb connection", dbConn);
  return <div>Sample </div>;
}

export default Stream;
