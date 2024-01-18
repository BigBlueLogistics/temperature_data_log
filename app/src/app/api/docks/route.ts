import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { AnyBulkWriteOperation, ObjectId, BulkOperationBase } from "mongodb";
import { getErrorMessage } from "@/utils";

type DockStatus = "VACANT" | "OCCUPIED";
type DocksParams = {
  dock_1: string;
  sensor_1: DockStatus;
  dock_2: string;
  sensor_2: DockStatus;
  dock_3: string;
  sensor_3: DockStatus;
  dock_4: string;
  sensor_4: DockStatus;
  dock_5: string;
  sensor_5: DockStatus;
};
type BulkQueryFunc = (
  dockId: string,
  dockStatus: DockStatus
) => AnyBulkWriteOperation;

const updateOne: BulkQueryFunc = (dockId, dockStatus) => {
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
                then: new Date().toLocaleString(),
                else: "$time_in",
              },
            },
            time_out: {
              $cond: {
                if: { $eq: [dockStatus, "VACANT"] },
                then: new Date().toLocaleString(),
                else: null,
              },
            },
          },
        },
      ],
    },
  };
};

const insertOne: BulkQueryFunc = (dockId, dockStatus) => {
  const type = dockStatus === "OCCUPIED" ? "time_in" : "time_out";
  return {
    insertOne: {
      document: {
        dock_id: dockId,
        type,
        log_at: new Date().toLocaleString(),
      },
    },
  };
};

const bulkQuery = (
  body: DocksParams,
  callback: BulkQueryFunc
): AnyBulkWriteOperation[] => {
  let queries = [];
  if (body.dock_1 && body.sensor_1) {
    queries.push(callback(body.dock_1, body.sensor_1));
  }
  if (body.dock_2 && body.sensor_2) {
    queries.push(callback(body.dock_2, body.sensor_2));
  }
  if (body.dock_3 && body.sensor_3) {
    queries.push(callback(body.dock_3, body.sensor_3));
  }
  if (body.dock_4 && body.sensor_4) {
    queries.push(callback(body.dock_4, body.sensor_4));
  }
  if (body.dock_5 && body.sensor_5) {
    queries.push(callback(body.dock_5, body.sensor_5));
  }

  return queries;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const post = await db
      .collection("docks")
      .bulkWrite(bulkQuery(body, updateOne));

    const logs = await db
      .collection("docks_log")
      .bulkWrite(bulkQuery(body, insertOne));

    return NextResponse.json({ status: "succeeded", data: [post, logs] });
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
