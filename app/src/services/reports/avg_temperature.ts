import mongodbInit from "@/lib/mongodb";

type TAvgTemperature = {
  fromDate?: Date;
  toDate?: Date;
  roomId?: string;
  warehouseNo?: string;
};

export default async function avg_temperature({
  fromDate,
  toDate,
  roomId,
  warehouseNo,
}: TAvgTemperature) {
  const conn = await mongodbInit;
  const db = conn.db(process.env.DB_NAME);

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
          _id: 0,
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

  return reportAvgTemp;
}
