const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const employeeRoute = require("./routes/employees");
const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api/employees", employeeRoute);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MongoDB_CONNECTION, { dbName: "AzulArcTest" })
  .then(() => console.log("DB Connection Successful!!"))
  .catch((error) => console.log("DB Connection Failed! Error Message:", error));

app.listen(process.env.PORT || 3001, () =>
  console.log("Backend is running on", process.env.PORT)
);
