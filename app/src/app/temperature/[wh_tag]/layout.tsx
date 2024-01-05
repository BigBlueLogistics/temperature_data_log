import type { Metadata } from "next";
import React from "react";

type Props = {
  params: { wh_tag: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const { wh_tag } = params;
  return {
    title: `Temperature | ${wh_tag.toUpperCase()}`,
  };
}

function TemperatureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default TemperatureLayout;
