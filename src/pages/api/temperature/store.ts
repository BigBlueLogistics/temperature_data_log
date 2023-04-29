import type { NextApiRequest, NextApiResponse } from "next";
import { Document, ObjectId } from "mongodb";
import mongodbInit from "@/lib/mongodb";
import { getErrorMessage } from "@/utils";

type TData = {
  data?: Document;
  status?: "succeeded" | "error";
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TData>
) {
  try {
    const client = await mongodbInit;
    const db = client.db(process.env.DB_NAME);

    const { body, method } = req;

    switch (method) {
      case "POST":
        const { celsius, humidity, heatindex, room_id } = body;

        const post = await db.collection("temperature").insertOne({
          celsius,
          humidity,
          heatindex,
          room_id: new ObjectId(room_id),
          created_at: new Date(),
        });
        res.status(200).json({ status: "succeeded", data: post });
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method "${method}" Not allowed`);
        break;
    }
  } catch (e) {
    return res
      .status(500)
      .json({ status: "error", message: getErrorMessage(e) });
  }
}
