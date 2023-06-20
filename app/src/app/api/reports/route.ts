import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getErrorMessage } from "@/utils";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const roomId = query.has("roomId")
      ? new ObjectId(query.get("roomId") as string)
      : undefined;
    const fromDate = query.has("from")
      ? new Date(query.get("from") as string)
      : undefined;
    const toDate = query.has("to")
      ? new Date(query.get("to") as string)
      : undefined;
    const warehouseNo = query.has("warehouse")
      ? query.get("warehouse")
      : undefined;
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    let $matchQuery = {};
    if (fromDate && toDate) {
      $matchQuery = { created_at: { $gte: fromDate, $lte: toDate } };
    }
    if (roomId) {
      $matchQuery = { ...$matchQuery, room_id: roomId };
    }
    if (warehouseNo) {
      $matchQuery = { ...$matchQuery, warehouse: warehouseNo };
    }

    const reportAvgTemp = await db
      .collection("avg_temperature")
      .aggregate([
        {
          $lookup: {
            from: "room",
            localField: "room_id",
            foreignField: "_id",
            pipeline: [
              // {
              //   $match: {
              //     warehouse_tag: "bb07",
              //   },
              // },
              {
                $project: {
                  _id: 0,
                  name: 1,
                  warehouse_tag: 1,
                },
              },
            ],
            as: "room",
          },
        },
        { $unwind: "$room" },
        {
          $project: {
            celsius: 1,
            warehouse: "$room.warehouse_tag",
            location: "$room.name",
            created_at: 1,
          },
        },
        {
          $match: {
            $and: [$matchQuery],
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
