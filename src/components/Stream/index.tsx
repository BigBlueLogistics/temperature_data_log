"use client";

import { useEffect, useState, Suspense } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChangeStreamDocument } from "mongodb";
import GaugeSkeleton from "@/components/GaugeSkeleton";
import { TStreamData, Props } from "./types";

const inter = Inter({ subsets: ["latin"] });
const Gauge = dynamic(() => import("../Gauge"), {
  loading: () => <GaugeSkeleton />,
});

function Stream({ initialTemp }: Props) {
  const [listTemp, setTemp] = useState(initialTemp);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource("/api/watcher", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
        },
        onmessage(event) {
          console.log("Event message: ", event.data);
          const parsedData: ChangeStreamDocument<TStreamData> = JSON.parse(
            event.data
          );

          // Update the UI with the new data
          if (parsedData.operationType === "insert") {
            const { room_id, celsius, created_at } = parsedData.fullDocument;

            setTemp((prev) => ({
              ...prev,
              [room_id]: {
                ...prev[room_id],
                temperature: {
                  celsius,
                  created_at,
                },
              },
            }));
          }
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
    };

    fetchData();
  }, []);

  const arrListTemp = Object.entries(listTemp);

  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 md:gap-y-4 md:gap-x-2 lg:text-left">
      <Suspense fallback={<div>Loading...</div>}>
        {arrListTemp ? (
          arrListTemp.map((item) => (
            <div
              key={item[0]}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            >
              <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
                {item[1].name}
              </h2>
              <Gauge
                renderTo={`${item[0]}`}
                width={200}
                height={200}
                units={"°C"}
                title={"Temperature"}
                value={item[1].temperature?.celsius}
                minValue={0}
                maxValue={40}
                majorTicks={[40, 35, 30, 25, 20, 15, 10, 5, 0]}
                minorTicks={5}
                strokeTicks={true}
                barStartPosition="right"
                highlights={[
                  {
                    from: 0,
                    to: 10,
                    color: "red",
                  },
                  {
                    from: 10,
                    to: 15,
                    color: "yellow",
                  },
                  {
                    from: 15,
                    to: 25,
                    color: "#04fe2d",
                  },
                  {
                    from: 25,
                    to: 30,
                    color: "yellow",
                  },
                  {
                    from: 30,
                    to: 40,
                    color: "red",
                  },
                ]}
                valueBox
                colorPlate={"#fff"}
                borderShadowWidth={0}
                borders={false}
                needleType={"arrow"}
                needleWidth={2}
                needleCircleSize={7}
                needleCircleOuter
                needleCircleInner={false}
                animationDuration={10000}
                animationRule={"linear"}
              />
            </div>
          ))
        ) : (
          <div>No data available.</div>
        )}
      </Suspense>
    </div>
  );
}

export default Stream;
