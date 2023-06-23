import { NextRequest, NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { getErrorMessage } from "@/utils";
import { LocationEntity } from "@/entities/location";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const conn = await mongodbInit;
    const db = conn.db(process.env.DB_NAME);

    let findQuery = {};
    if (query.has("warehouse_tag")) {
      findQuery = { warehouse_tag: query.get("warehouse_tag") };
    }
    const room = await db
      .collection<LocationEntity>("room")
      .find(findQuery)
      .toArray();

    return NextResponse.json({ status: "succeeded", data: room });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
