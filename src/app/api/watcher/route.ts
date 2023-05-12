import { NextResponse } from "next/server";
import mongodbInit from "@/lib/mongodb";

export const runtime = "nodejs";
// Enable streaming
export const dynamic = "force-dynamic";

export async function GET() {
  const client = await mongodbInit;
  const db = client.db(process.env.DB_NAME);

  const encoder = new TextEncoder();
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  const changeStream = db.collection("temperature").watch();

  changeStream.on("change", async (change: any) => {
    console.log("Change stream events:", writer);

    await writer.ready;
    await writer.write(encoder.encode(`data: ${JSON.stringify(change)}\n\n`));
  });

  return new NextResponse(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
