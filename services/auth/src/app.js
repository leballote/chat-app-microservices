require("./utils/validateEnvVariables")();

const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const appLogger = require("./middlewares/appLogger.middleware");

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const app = express();

app.use(express.json());
app.use(appLogger);
app.use("/auth", authRouter);
app.get("/healthz", (_, res) => {
  return res.send("Healthy!");
});

mongoose.connect(MONGODB_CONNECTION_STRING).then(
  app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}`);
  })
);
