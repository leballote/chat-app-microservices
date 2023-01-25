const mongoose = require("mongoose");
const { AppValidationError, DuplicationError } = require("../errors/throwable");
const IndividualRel = require("../models/individualRel.model");
const Participant = require("../models/participant.model");
const Message = require("../models/message.model");
const getNonUndefinedValues = require("../utils/getNonUndefinedValues");

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
  }

  if (!participants[0]?.id) {
    throw new AppValidationError("Participants must have id", "participants");
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
  }

  if (!participants[0]?.id) {
    throw new AppValidationError("Participants must have id", "participants");
  }
  if (type === "individual") {
    return this.createIndividualChat({ participants });
  } else {
    return this.createGroupChat({ name, phrase, participants });
  }
};

chatSchema.methods.deleteBaseChatExtraData = async function () {
  const participantsPromise = Participant.find({ "chat.id": this._id });
  const messagesPromise = Message.find({ chatId: this._id });
  const [participants, messages] = await Promise.all([
    participantsPromise,
    messagesPromise,
  ]);
  await Promise.all([
    Participant.deleteMany({ "chat.id": this._id }),
    Message.deleteMany({ chatId: this._id }),
  ]);
  return {
    participants: participants.map((participant) => participant.user),
    messages,
  };
};

chatSchema.methods.deleteIndividualChatExtraData = async function () {
  const { participants, messages } = await this.deleteBaseChatExtraData();

  const participantsIds = participants
    .map((participant) => participant.id)
    .sort();

  await IndividualRel.find({
    $or: [
      {
        user1Id: participantsIds[1],
        user2Id: participantsIds[0],
      },
      {
        user1Id: participantsIds[0],
        user2Id: participantsIds[1],
      },
    ],
  });
  const individualRel = await IndividualRel.findOneAndDelete({
    $or: [
      {
        user1Id: participantsIds[1],
        user2Id: participantsIds[0],
      },
      {
        user1Id: participantsIds[0],
        user2Id: participantsIds[1],
      },
    ],
  });
  return { participants, messages, individualRel };
};

chatSchema.methods.deleteGroupChatExtraData = async function () {
  const { participants, messages } = this.deleteBaseChatExtraData();
  return { participants, messages };
};

chatSchema.methods.deleteChatExtraData = async function () {
  if (this.type === "individual") {
    const { participants, messages } =
      await this.deleteIndividualChatExtraData();
    return { participants, messages };
  } else {
    const { participants, messages } = await this.deleteGroupChatExtraData();
    return { participants, messages };
  }
};

chatSchema.statics.deleteChat = async function ({ id, user1Id, user2Id }) {
  const query = getNonUndefinedValues({ id, user1Id, user2Id });
  const chat = await this.findOneAndDelete(query);
  const { participants } = await chat.deleteChatExtraData();

  return {
    ...chat.toObject(),
    participants,
  };
};

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
