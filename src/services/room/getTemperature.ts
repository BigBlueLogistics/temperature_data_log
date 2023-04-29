import mongodbInit from "@/lib/mongodb";

export default async function getTemperature() {
  const conn = await mongodbInit;
  const db = conn.db(process.env.DB_NAME);

  const room = await db
    .collection("room")
    .aggregate([
      {
        $lookup: {
          from: "temperature",
          localField: "_id",
          foreignField: "room_id",
          pipeline: [
            {
              $project: {
                _id: 0,
                celsius: 1,
                created_at: 1,
              },
            },
            { $sort: { created_at: -1 } },
            { $limit: 1 },
          ],
          as: "temperature",
        },
      },
    ])
    .toArray();

  const objRoom = room.reduce((prev, current) => {
    const { _id: id, name, temperature } = current;

    prev[id] = {
      name,
      temperature: temperature[0] || null,
    };
    return prev;
  }, {});

  return objRoom;
}
