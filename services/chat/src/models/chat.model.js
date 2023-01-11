const mongoose = require("mongoose");
const { AppValidationError, DuplicationError } = require("../errors/throwable");
const IndividualRel = require("../models/individualRel.model");
const Participant = require("../models/participant.model");

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
    },
    lastMessageId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

chatSchema.methods.createChatRels = async function ({ participants }) {
  const chatRels = [];
  for (const { id, admin = false } of participants) {
    const chatRel = {
      user: { id, admin, participantSince: this.createdAt, status: "active" },
      chat: { id: this._id },
    };
    chatRels.push(chatRel);
  }
  return Participant.create(chatRels);
};

chatSchema.statics.createIndividualChat = async function ({ participants }) {
  if (!participants?.length || participants.length < 2) {
    throw new AppValidationError(
      "Participants must be at least two",
      "participants"
    );
    // return res
    //   .status(400)
    //   .send({ error: { message: "Participants must be at least two" } });
  }

  //this is an euristic, all participants should have id
  if (!participants[0]?.id) {
    throw new AppValidationError("Participants must have id", "participants");
    // return res.status(400).send({
    //   error: {
    //     message: "Participants must have id",
    //   },
    // });
  }
  const user1Id =
    participants[0].id > participants[1].id
      ? participants[0].id
      : participants[1].id;
  const user2Id =
    participants[0].id > participants[1].id
      ? participants[1].id
      : participants[0].id;

  if (user1Id == user2Id) {
    throw new AppValidationError(
      "Can't create an individual chat with yourself",
      "participants"
    );
    // return res.status(400).send({
    //   error: { message: "Can't create an individual chat with yourself" },
    // });
  }

  const individualRel = await IndividualRel.findOne({
    user1Id,
    user2Id,
  });

  if (individualRel) {
    throw new DuplicationError(
      "There can only be one individual chat between two users. There already exists one",
      {
        key: "participants",
        value: {
          user1Id,
          user2Id,
        },
      },
      { alreadyExistingChatId: individualRel.chatId }
    );
    // return res.status(400).send({
    //   error: {
    //     message:
    //       "There can only be one individual chat between two users. There already exists one",
    //     data: { chatId: individualRel.chatId },
    //   },
    // });
  }

  const chat = await this.create({ type: "individual" });

  await IndividualRel.create({
    user1Id,
    user2Id,
    chatId: chat._id,
  });

  const chatUserRels = await chat.createChatRels({ participants });
  return {
    ...chat.toObject(),
    participants: chatUserRels.map((rel) => rel.user),
  };
};

chatSchema.statics.createGroupChat = async function ({
  name,
  phrase = "",
  participants,
}) {
  const chat = await this.create({ name, phrase, type: "group" });
  const chatUserRels = await chat.createChatRels({ participants });
  const out = {
    ...chat.toObject(),
    participants: chatUserRels.map((rel) => rel.user),
  };
  console.log(out);
  return out;
};

chatSchema.statics.createChat = function ({
  name,
  type,
  phrase = "",
  participants,
}) {
  if (!participants?.length || participants.length < 2) {
    throw new AppValidationError(
      "Participants must ve at least two",
      "participants"
    );
    // return res
    //   .status(400)
    //   .send({ error: { message: "Participants must be at least two" } });
  }

  //this is an euristic, all participants should have id
  if (!participants[0]?.id) {
    throw new AppValidationError("Participants must have id", "participants");
    // return res.status(400).send({
    //   error: {
    //     message: "Participants must have id",
    //   },
    // });
  }
  if (type === "individual") {
    return this.createIndividualChat({ participants });
  } else {
    return this.createGroupChat({ name, phrase, participants });
  }
};

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
