"use client";

import { useEffect, useRef } from "react";
import { RadialGauge, RadialGaugeOptions } from "canvas-gauges";

function Gauge(props: RadialGaugeOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gaugeRef = useRef<RadialGauge | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      gaugeRef.current = new RadialGauge({
        ...props,
        renderTo: canvasRef.current,
        animation: false,
        fontValueSize: 38,
      }).draw();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasRef.current && gaugeRef && gaugeRef.current) {
      // gaugeRef.current.value = props.value as any;
      gaugeRef.current.update({
        valueText: String(props.value),
        value: props.value,
        renderTo: props.renderTo,
      });

      // It's update the other options but had bug that cause
      // arrow don't animate when object key {value: } is included on update function
      // gaugeRef.current.update(cloneProps);
    }
  }, [props]);

  return <canvas ref={canvasRef} />;
}

export default Gauge;
