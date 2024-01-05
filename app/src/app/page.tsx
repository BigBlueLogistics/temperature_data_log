import type { Metadata } from "next";
import HomeTemplate from "@/components/HomeTemplate";
import { warehouseList } from "@/services/internal";

export const metadata: Metadata = {
  title: "Temperature | Home",
};

async function Home() {
  const warehouse = await warehouseList();

  return <HomeTemplate warehouseList={warehouse} />;
}

export default Home;
