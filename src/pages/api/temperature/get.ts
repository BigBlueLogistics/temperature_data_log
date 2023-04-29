// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Document } from "mongodb";
import mongodbInit from "@/lib/mongodb";
import { getErrorMessage } from "@/util";

type TData = {
  data?: Document[];
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

    const temp = await db
      .collection("temperature")
      .find({})
      .sort({ created_at: -1 })
      .limit(1)
      .toArray();

    return res.json({ status: "succeeded", data: temp });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "error", message: getErrorMessage(e) });
  }
}
