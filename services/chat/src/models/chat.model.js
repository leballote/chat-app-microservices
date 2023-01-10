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
    lastMessageId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

chatSchema.static.createIndividualChat = function ({ participants }) {
  this.create();
};

chatSchema.static.createGroupChat = function ({
  name,
  type,
  phrase = "",
  participants,
}) {};

chatSchema.static.createChat = function ({ name, type, phrase, participants }) {
  this.create();
};

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
