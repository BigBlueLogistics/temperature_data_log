"use client";

import { useState, useEffect } from "react";
import HomeTemplate from "@/components/HomeTemplate";
import getWarehouse from "@/services/warehouse/get";
import { WarehouseEntity } from "@/entities/warehouse";

export default function Home() {
  const [warehouseList, setWarehouseList] = useState<WarehouseEntity[]>([]);

  const getListOfWarehouse = async () => {
    const warehouse = await getWarehouse();
    setWarehouseList(warehouse.data);
  };

  useEffect(() => {
    getListOfWarehouse();
  }, []);

  return <HomeTemplate warehouseList={warehouseList} />;
}
