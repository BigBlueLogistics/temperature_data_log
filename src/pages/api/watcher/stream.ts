import type { NextApiRequest, NextApiResponse } from "next";
import mongodbInit from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await mongodbInit;
  const db = client.db(process.env.DB_NAME);

  const changeStream = db.collection("temperature").watch();

  changeStream.on("change", (change) => {
    console.log("Change stream event:", change);

    // Send the updated data to the mongodbInit
    res.write(`data: ${JSON.stringify(change)}\n\n`);
  });

  req.socket.on("close", () => {
    changeStream.close();
    client.close();
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.statusCode = 200;
  res.write("\n");
}
