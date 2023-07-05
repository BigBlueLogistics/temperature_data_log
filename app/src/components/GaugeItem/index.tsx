"use client";

import dynamic from "next/dynamic";
import { Unstable_Grid2 as Grid } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GaugeSkeleton from "@/components/GaugeSkeleton";
import { GridWrapper, Title, TitleRH, Humidity } from "./elements";
import { TGaugeItem } from "./types";

const Gauge = dynamic(() => import("../Gauge"), {
  loading: () => <GaugeSkeleton />,
});

function GaugeItem({ data }: TGaugeItem) {
  return (
    <Grid key={data[0]} xs={12} sm={5.5} md={3.7} lg={2.75}>
      <GridWrapper>
        <Title variant="h2">{data[1].name}</Title>
        <Gauge
          renderTo={`${data[0]}`}
          width={200}
          height={200}
          units="°C"
          title="Temperature"
          value={data[1].temperature?.celsius || 0}
          minValue={0}
          maxValue={40}
          majorTicks={[40, 35, 30, 25, 20, 15, 10, 5, 0]}
          minorTicks={5}
          strokeTicks={true}
          // @ts-ignore
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
          colorPlate="#fff"
          borderShadowWidth={0}
          borders={false}
          needleType="arrow"
          needleWidth={2}
          needleCircleSize={7}
          needleCircleOuter
          needleCircleInner={false}
          animationDuration={10000}
          animationRule="linear"
        />
        <TitleRH>
          <WaterDropIcon />
          RH:
          <Humidity>{data[1].temperature?.humidity || 0}</Humidity>%
        </TitleRH>
      </GridWrapper>
    </Grid>
  );
}

export default GaugeItem;
