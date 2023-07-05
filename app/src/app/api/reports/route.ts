import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getErrorMessage } from "@/utils";
import { AvgTempEntity } from "@/entities/avgTemperature";
import { format } from "date-fns";

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
    let addFields = {};
    if (recordedAt) {
      const fromDate = format(new Date(recordedAt[0]), "yyyy-MM-dd");
      const toDate = format(new Date(recordedAt[1]), "yyyy-MM-d");

      avgTempQuery = {
        createdDate: {
          $gte: fromDate,
          $lte: toDate,
        },
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
          $addFields: {
            createdDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$created_at",
                timezone: "Asia/Manila",
              },
            },
            createdTime: {
              $dateToString: {
                format: "%H:%M:%S",
                date: "$created_at",
                timezone: "Asia/Manila",
              },
            },
          },
        },
        {
          $match: {
            ...avgTempQuery,
          },
        },
        {
          $project: {
            _id: 0,
            celsius: 1,
            warehouse: "$location.warehouse_tag",
            location: "$location.name",
            created_at: { $concat: ["$createdDate", " ", "$createdTime"] },
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
