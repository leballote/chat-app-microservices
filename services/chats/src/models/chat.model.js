const mongoose = require("mongoose");

//TODO: I have to track the last message sent or the id of it,
const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      validate(value) {
        if (!["group", "individual"].includes(value)) {
          throw new Error("Field must be group or individual");
        }
      },
    },
    phrase: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
