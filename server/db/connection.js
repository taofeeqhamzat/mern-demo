import { MongoClient } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri);

try {
  // Connect the client to MongoDB cluster
  await client.connect();
  // Send a ping to the server to check if the connection is successful
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to MongoDB");
} catch (err) {
  console.error(err);
}
let db = client.db("test");

export default db;
