import mongodbInit from "@/lib/mongodb";

type TWarehouse = { name: string; tag_id: string };

export default async function list() {
  const conn = await mongodbInit;
  const db = conn.db(process.env.DB_NAME);

  const warehouse = await db
    .collection<TWarehouse>("warehouse")
    .find()
    .project<TWarehouse>({ _id: 0, name: true, tag_id: true })
    .toArray();

  return warehouse;
}
