require("./utils/validateEnvVariables")();

const express = require("express");
const mongoose = require("mongoose");
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

const chatRouter = require("./routes/chat.routes");
const messageRouter = require("./routes/message.routes");
const participantRouter = require("./routes/participant.routes");

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const app = express();

app.use(express.json());
app.use(chatRouter);
app.use("/participant", participantRouter);
app.use(messageRouter);

mongoose.connect(MONGODB_CONNECTION_STRING).then(
  app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}`);
  })
);
