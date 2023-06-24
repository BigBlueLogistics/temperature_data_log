import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getErrorMessage } from "@/utils";
import { AvgTempEntity } from "@/entities/avgTemperature";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;

    const location = query.has("location")
      ? new ObjectId(query.get("location") as string)
      : undefined;
    const recordedAt = query.has("recordedAt")
      ? JSON.parse(query.get("recordedAt") as string)
      : undefined;
    const warehouseNo = query.has("warehouseNo")
      ? query.get("warehouseNo")
      : undefined;
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    let avgTempQuery = {};
    let roomQuery = {};
    if (recordedAt) {
      const [fromDate, toDate] = recordedAt as [Date, Date];
      avgTempQuery = {
        created_at: { $gte: new Date(fromDate), $lte: new Date(toDate) },
      };
    }
    if (location) {
      roomQuery = { ...roomQuery, _id: location };
    }
    if (warehouseNo) {
      roomQuery = { ...roomQuery, warehouse_tag: warehouseNo };
    }

    const reportAvgTemp = await db
      .collection("avg_temperature")
      .aggregate<AvgTempEntity>([
        {
          $lookup: {
            from: "room",
            localField: "room_id",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  ...roomQuery,
                },
              },
              {
                $project: {
                  name: 1,
                  warehouse_tag: 1,
                },
              },
            ],
            as: "location",
          },
        },
        { $unwind: "$location" },
        {
          $project: {
            _id: 0,
            celsius: 1,
            warehouse: "$location.warehouse_tag",
            location: "$location.name",
            created_at: 1,
          },
        },
        {
          $match: {
            ...avgTempQuery,
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      status: "succeeded",
      data: reportAvgTemp,
    });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
