import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature | Reports",
};

function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default ReportsLayout;
