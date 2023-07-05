"use client";

import { useEffect, useState } from "react";
import { AutocompleteChangeReason } from "@mui/material";
import ReportsTemplate from "@/components/ReportsTemplate";
import getAvgTemp from "@/services/reports/avg_temperature";
import getWarehouse from "@/services/warehouse/get";
import getLocation from "@/services/location/get";
import { AvgTempEntity } from "@/entities/avgTemperature";
import { WarehouseEntity } from "@/entities/warehouse";
import { LocationEntity } from "@/entities/location";
import { writeExcel } from "@/lib/excel";
import { TPropsReports, TFilterValues } from "./types";
import miscData from "./miscData";

function Reports({ searchParams }: TPropsReports) {
  const { columns } = miscData();
  const { warehouseNo, location, recordedAt } = searchParams || {};

  const [filterValues, setFilterValues] = useState<TFilterValues>({
    location: null,
    warehouseNo: null,
    recordedAt: null,
  });
  const [reportsData, setReportsData] = useState<AvgTempEntity[]>([]);
  const [warehouseList, setWarehouseList] = useState<WarehouseEntity[]>([]);
  const [locationList, setLocationList] = useState<LocationEntity[]>([]);

  const onFilter = async (arg: TPropsReports["searchParams"]) => {
    const res = await getAvgTemp(arg);
    if (res.status === "succeeded") {
      setReportsData(res.data);
    }
  };

  const onExport = async (
    warehouse: string | undefined,
    location: string | undefined
  ) => {
    const buffer = writeExcel({
      columns: [
        { key: "warehouse", header: "Warehouse" },
        { key: "location", header: "Location" },
        { key: "celsius", header: "Temperature" },
        { key: "created_at", header: "Recorded at" },
      ],
      data: reportsData,
      filename: "reports",
      sheetname: "Temperature",
    });

    let filename = "Temperature";
    if (warehouse) {
      filename += `-${warehouse}`;
    }
    if (location) {
      filename += `-${location}`;
    }

    buffer.then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const onLocation = (
    value: LocationEntity | null,
    reason: AutocompleteChangeReason
  ) => {
    setFilterValues((prev) => {
      if (reason === "selectOption") {
        return { ...prev, location: value };
      } else if (reason === "clear") {
        return { ...prev, location: null };
      }
      return prev;
    });
  };

  const onWarehouse = (
    value: WarehouseEntity | null,
    reason: AutocompleteChangeReason
  ) => {
    setFilterValues((prev) => {
      if (reason === "selectOption") {
        return { ...prev, warehouseNo: value, location: null };
      } else if (reason === "clear") {
        return { ...prev, warehouseNo: null, location: null };
      }
      return prev;
    });
  };

  const onRecordedAt = (dates: [Date, Date] | null) => {
    let dateRange = dates;
    if (dateRange && dateRange.every((value) => value === null)) {
      dateRange = null;
    }
    setFilterValues((prev) => ({
      ...prev,
      recordedAt: dateRange,
    }));
  };

  const getListOfWarehouse = async () => {
    const warehouse = await getWarehouse();
    setWarehouseList(warehouse.data);
  };

  const getListOfLocation = async (warehouseTag: string) => {
    const location = await getLocation(warehouseTag);
    setLocationList(location.data);
  };

  useEffect(() => {
    getListOfWarehouse();
  }, []);

  useEffect(() => {
    if (filterValues.warehouseNo) {
      getListOfLocation(filterValues.warehouseNo.tag_id);
    }
  }, [filterValues.warehouseNo]);

  return (
    <ReportsTemplate
      columns={columns}
      data={reportsData}
      warehouseList={warehouseList}
      locationList={locationList}
      filterValues={filterValues}
      onFilter={onFilter}
      onExport={onExport}
      onLocation={onLocation}
      onWarehouse={onWarehouse}
      onRecordedAt={onRecordedAt}
    />
  );
}

export default Reports;
