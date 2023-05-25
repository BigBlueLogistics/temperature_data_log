require("dotenv").config();
const cron = require("node-cron");
const { MongoClient, ObjectId } = require("mongodb");
const { format, parseISO } = require("date-fns");
const { count } = require("console");

const { MONGODB_URI, DB_NAME } = process.env;
const conn = new MongoClient(MONGODB_URI, {});

cron.schedule("*/2 * * * * *", async function () {
  // const temp = await conn
  //   .db(DB_NAME)
  //   .collection("room")
  //   .find()
  //   .map(async function (doc) {
  //     // const lastRead = await conn
  //     //   .db(DB_NAME)
  //     //   .collection("last_read")
  //     //   .find({ room_id: doc._id })
  //     //   .toArray();

  //     let temp = [];
  //     // const from = doc.last_read_at ?  :
  //     if (doc.last_read_at) {
  //       temp = await conn
  //         .db(DB_NAME)
  //         .collection("temperature")
  //         .aggregate([
  //           {
  //             $match: { room_id: doc._id },
  //           },
  //           {
  //             $group: { _id: "$room_id", total: { $avg: "$celsius" } },
  //           },
  //         ])
  //         .toArray();
  //     }

  //     return {
  //       name: doc.name,
  //       room_id: doc._id,
  //       temperature: JSON.stringify(temp),
  //     };
  //   })
  //   .toArray();
  // console.log("Job mongo", temp);
  console.log(
    "Job mongo",
    format(new Date(), "MM/dd/yyyy hh:mm:ss", { locale: "Asia/Manila" })
  );
});
