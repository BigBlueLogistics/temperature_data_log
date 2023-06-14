"use client";

import { useEffect, useState, Suspense } from "react";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChangeStreamDocument } from "mongodb";
import GaugeItem from "@/components/GaugeItem";
import { TGaugeData, Props } from "./types";

function GaugeList({ initialTemp }: Props) {
  const [listTemp, setTemp] = useState(initialTemp);

  useEffect(() => {
    const gaugeController = new AbortController();
    const fetchData = async () => {
      await fetchEventSource("/api/watcher", {
        signal: gaugeController.signal,
        method: "GET",
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection success ", res);
            return Promise.resolve();
          } else {
            console.log("Connection error ", res);
            return Promise.reject();
          }
        },
        onmessage(event) {
          console.log("Event message: ", event.data);
          const parsedData: ChangeStreamDocument<TGaugeData> = JSON.parse(
            event.data
          );

          // Update the UI with the new data
          if (parsedData.operationType === "insert") {
            const { room_id, celsius, humidity, created_at } =
              parsedData.fullDocument;

            // If room exist update the temperature
            if (listTemp && listTemp[room_id]) {
              setTemp((prev) => ({
                ...prev,
                [room_id]: {
                  ...prev[room_id],
                  temperature: {
                    celsius: Number(celsius),
                    humidity: Number(humidity),
                    created_at,
                  },
                },
              }));
            }
          } else {
            console.log(parsedData.operationType);
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

    return () => {
      gaugeController.abort();
    };
  }, []);

  const arrListTemp = Object.entries(listTemp);

  return (
    <Grid
      container
      columnGap={1}
      rowGap={2}
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Suspense
        fallback={
          <Typography sx={{ color: "#c3c3c3" }} fontSize={20}>
            Loading...
          </Typography>
        }
      >
        {arrListTemp && arrListTemp.length ? (
          arrListTemp.map((item) => <GaugeItem key={item[0]} data={item} />)
        ) : (
          <Typography sx={{ color: "#c3c3c3" }} fontSize={20}>
            No data available.
          </Typography>
        )}
      </Suspense>
    </Grid>
  );
}

export default GaugeList;
