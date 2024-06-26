require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const cron = require("node-cron");
const { MongoClient } = require("mongodb");
const { subMinutes } = require("date-fns");

const { MONGODB_URI, DB_NAME } = process.env;
const conn = new MongoClient(MONGODB_URI, {});

// Run job at every 30 minute.
cron.schedule("*/30 * * * *", async function () {
  try {
    const timeNow = new Date();
    const from = subMinutes(timeNow, 30);
    const to = timeNow;

    const roomAvgTemp = await conn
      .db(DB_NAME)
      .collection("temperature")
      .aggregate([
        {
          $match: {
            created_at: { $gt: from, $lte: to },
          },
        },
        {
          $group: {
            _id: "$room_id",
            avgCelsius: { $avg: "$celsius" },
            avgHumidity: { $avg: "$humidity" },
            maxCelsiusCreatedAt: { $max: "$created_at" },
          },
        },
        { $sort: { created_at: -1 } },
        {
          $addFields: {
            roundCelsius: { $round: ["$avgCelsius", 2] },
            roundHumidity: { $round: ["$avgHumidity", 2] },
          },
        },
        {
          $project: {
            _id: 0,
            room_id: "$_id",
            celsius: "$roundCelsius",
            humidity: "$roundHumidity",
            last_temperature_at: "$maxCelsiusCreatedAt",
          },
        },
      ])
      .toArray();

    if (roomAvgTemp && roomAvgTemp.length) {
      // Insert the average celsius if not exists in avg_temperature
      roomAvgTemp.forEach(
        ({ room_id, celsius, humidity, last_temperature_at }) => {
          conn.db(DB_NAME).collection("avg_temperature").findOneAndReplace(
            { room_id, last_temperature_at },
            {
              room_id,
              celsius,
              humidity,
              last_temperature_at,
              created_at: new Date(),
            },
            { upsert: true }
          );
        }
      );

      console.log(
        `[${new Date().toLocaleString()}] Job success: insert average temperature`
      );
    } else {
      console.log("Job: no average temperature");
    }
    return;
  } catch (error) {
    console.error(`Job error: ${error}`);
    return;
  }
});
