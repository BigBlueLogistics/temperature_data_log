import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getErrorMessage } from "@/utils";

export async function GET() {
  try {
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const temp = await db
      .collection("temperature")
      .find({})
      .sort({ created_at: -1 })
      .limit(1)
      .toArray();

    return NextResponse.json({ status: "succeeded", data: temp });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: getErrorMessage(e) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const { celsius, humidity, room_id } = body;

    const post = await db.collection("temperature").insertOne({
      celsius,
      humidity,
      room_id: new ObjectId(room_id),
      created_at: new Date(),
    });

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
