"use client";

import { useEffect, useState } from "react";
import { AutocompleteChangeReason } from "@mui/material";
import ReportsTemplate from "@/components/ReportsTemplate";
import { getLocation, getAvgTemp, getWarehouse } from "@/services/external";
import { WarehouseEntity } from "@/entities/warehouse";
import { LocationEntity } from "@/entities/location";
import { writeExcel } from "@/lib/excel";
import { TPropsReports, TFilterValues, TReportsData } from "./types";
import miscData from "./miscData";

function Reports({ searchParams }: TPropsReports) {
  const { columns } = miscData();
  const { warehouseNo, location, recordedAt } = searchParams || {};

  const [filterValues, setFilterValues] = useState<TFilterValues>({
    location: null,
    warehouseNo: null,
    recordedAt: null,
  });
  const [reportsData, setReportsData] = useState<TReportsData>({
    data: [],
    status: "idle",
    message: "",
  });
  const [warehouseList, setWarehouseList] = useState<WarehouseEntity[]>([]);
  const [locationList, setLocationList] = useState<LocationEntity[]>([]);

  const onFilter = async (arg: TPropsReports["searchParams"]) => {
    if (arg === null) {
      return;
    }
    setReportsData((prev) => ({ ...prev, status: "loading" }));

    try {
      const res = await getAvgTemp(arg);
      if (res.status === "succeeded") {
        setReportsData({
          status: "succeeded",
          data: res.data,
          message: res.message,
        });
      }
    } catch (err: any) {
      setReportsData({
        status: "failed",
        data: [],
        message: err.message,
      });
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
        { key: "humidity", header: "Humidity" },
        { key: "created_at", header: "Recorded at" },
      ],
      data: reportsData.data,
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

    buffer.then((data: BlobPart) => {
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
      data={reportsData.data}
      warehouseList={warehouseList}
      locationList={locationList}
      filterValues={filterValues}
      isLoadingData={reportsData.status === "loading"}
      onFilter={onFilter}
      onExport={onExport}
      onLocation={onLocation}
      onWarehouse={onWarehouse}
      onRecordedAt={onRecordedAt}
    />
  );
}

export default Reports;
