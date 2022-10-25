const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sentBy: {
      type: String,
      required: true,
    },
    sentAt: {
      type: mongoose.SchemaTypes.Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "chat",
      required: true,
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("message", chatSchema);

module.exports = ChatModel;
