import HomeTemplate from "@/components/HomeTemplate";
import getWarehouse from "@/services/warehouse/get";

async function Home() {
  const warehouse = await getWarehouse();

  return <HomeTemplate warehouseList={warehouse.data} />;
}

export default Home;
