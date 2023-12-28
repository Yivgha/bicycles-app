const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const bicycleRouter = require("./routes/api/bicycles");

const app = express();

const formatsLogger = app.get("config.env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/bicycles", bicycleRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal Server Error " } = err;
  res.status(status).json({ message });
});

module.exports = app;
