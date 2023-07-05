import { NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";
import { getErrorMessage } from "@/utils";
import { WarehouseEntity } from "@/entities/warehouse";

export async function GET() {
  try {
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const warehouse = await db
      .collection<WarehouseEntity>("warehouse")
      .find({ is_delete: false })
      .project<WarehouseEntity>({
        _id: 0,
        name: true,
        tag_id: true,
        is_delete: true,
      })
      .toArray();

    return NextResponse.json({ status: "succeeded", data: warehouse });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
