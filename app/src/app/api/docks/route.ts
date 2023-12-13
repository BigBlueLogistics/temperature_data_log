import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getErrorMessage } from "@/utils";

export async function POST(req: NextRequest) {
  const updateOne = (dockId: string, dockStatus: "VACANT" | "OCCUPIED") => {
    return {
      updateOne: {
        filter: { _id: new ObjectId(dockId), status: { $ne: dockStatus } },
        update: [
          {
            $set: {
              status: dockStatus,
              time_in: {
                $cond: {
                  if: { $eq: [dockStatus, "OCCUPIED"] },
                  then: new Date(),
                  else: "$time_in",
                },
              },
              time_out: {
                $cond: {
                  if: { $eq: [dockStatus, "VACANT"] },
                  then: new Date(),
                  else: null,
                },
              },
            },
          },
        ],
      },
    };
  };

  try {
    const body = await req.json();
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const {
      sensor_1,
      dock_1,
      sensor_2,
      dock_2,
      sensor_3,
      dock_3,
      sensor_4,
      dock_4,
      sensor_5,
      dock_5,
    } = body;

    const post = await db
      .collection("docks")
      .bulkWrite([
        updateOne(dock_1, sensor_1),
        updateOne(dock_2, sensor_2),
        updateOne(dock_3, sensor_3),
        updateOne(dock_4, sensor_4),
        updateOne(dock_5, sensor_5),
      ]);

    return NextResponse.json({ status: "succeeded", data: post });
  } catch (e) {
    return NextResponse.json(
      {
        status: "error",
        message: getErrorMessage(e),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const temp = await db.collection("docks").find({}).toArray();

    return NextResponse.json({ status: "succeeded", data: temp });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
