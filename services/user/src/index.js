require("./utils/validateEnvVariables")();

const express = require("express");
const mongoose = require("mongoose");
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const app = express();

const userRouter = require("./routes/user.routes");
const friendshipRouter = require("./routes/friendship.routes");

app.use(express.json());
app.use(userRouter);
app.use(friendshipRouter);

mongoose.connect(MONGODB_CONNECTION_STRING).then(
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  })
);
