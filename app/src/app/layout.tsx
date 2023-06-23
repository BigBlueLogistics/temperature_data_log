import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata = {
  title: "Temperature monitoring",
  description: "BigBlue temperature monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
