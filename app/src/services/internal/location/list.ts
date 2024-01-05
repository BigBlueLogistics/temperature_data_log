import mongodbInit from "@/lib/mongodb";

type TList = { warehouseSlug: string };
type TRooms = { name: string; warehouse_tag: string };

export default async function locationList({ warehouseSlug }: TList) {
  const conn = await mongodbInit;
  const db = conn.db(process.env.DB_NAME);

  const room = await db
    .collection<TRooms>("room")
    .find({ warehouse_tag: warehouseSlug })
    .sort({ order: 1 })
    .toArray();

  const objRoom = room.reduce((prev, current) => {
    const { _id, name } = current;
    const id = _id.toString();

    const formatObj = { [id]: { name, temperature: null } };
    Object.assign(prev, formatObj);
    return prev;
  }, {});

  return objRoom;
}
