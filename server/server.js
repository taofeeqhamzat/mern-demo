import express from "express";
import cors from "cors";
import morgan from "morgan";
import records from "./routes/records.js";

const port = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/records", records);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
