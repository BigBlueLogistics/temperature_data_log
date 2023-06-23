import mongodbInit from "@/lib/mongodb";

type TWarehouse = { name: string; tag_id: string; is_delete: Boolean };

export default async function list() {
  const conn = await mongodbInit;
  const db = conn.db(process.env.DB_NAME);

  const warehouse = await db
    .collection<TWarehouse>("warehouse")
    .find({ is_delete: false })
    .project<TWarehouse>({ _id: 0, name: true, tag_id: true })
    .toArray();

  return warehouse;
}
