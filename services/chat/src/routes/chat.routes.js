const Chat = require("../models/chat.model");
const Participant = require("../models/participant.model");
const IndividualRel = require("../models/individualRel.model");
const { default: mongoose } = require("mongoose");
const { appErrors } = require("../errors");

const router = require("express").Router();

const errors = {
  serverError: appErrors.serverError(),
};

router.post("/chat", async (req, res) => {
  const { name, type, phrase } = req.body;
  const chatData = { name, type, phrase };
  const { participants } = req.body;

  if (!participants?.length || participants.length < 2) {
    return res
      .status(400)
      .send({ error: { message: "Participants must be at least two" } });
  }

  //this is an euristic, all participants should have id
  if (!participants[0]?.id) {
    return res.status(400).send({
      error: {
        message: "Participants must have id",
      },
    });
  }
  const participantsIds = participants.map((participant) => participant.id);

  const user1Id =
    participantsIds[0] > participantsIds[1]
      ? participantsIds[0]
      : participantsIds[1];
  const user2Id =
    participantsIds[0] > participantsIds[1]
      ? participantsIds[1]
      : participantsIds[0];

  if (type == "individual") {
    if (name || phrase) {
      return res.status(400).send({
        error: { message: "Individual chats cannot have a name or phrase" },
      });
    }
    if (participantsIds.length > 2) {
      return res.status(400).send({
        error: {
          message:
            "For individual chats there must be at most two participants",
        },
      });
    }

    //TODO: we should also handle unique key error; see how you handeled it before in auth
    try {
      const individualRel = await IndividualRel.findOne({
        user1Id,
        user2Id,
      });

      if (individualRel) {
        return res.status(400).send({
          error: {
            message:
              "There can only be one individual chat between two users. There already exists one",
            data: { chatId: individualRel.chatId },
          },
        });
      }
    } catch (e) {
      return res
        .status(500)
        .send({ ...errors.serverError, debug: { error: e.message } });
    }
  }

  try {
    const chat = await Chat.create(chatData);
    //there should not be  unique key error because it is handeled before
    if (type == "individual") {
      if (user1Id == user2Id) {
        return res.status(400).send({
          error: { message: "Can't create an individual chat with yourself" },
        });
      }
      await IndividualRel.create({
        user1Id,
        user2Id,
        chatId: chat._id,
      });
    }
    const chatRels = [];
    for (const { id, admin = false } of participants) {
      const chatRel = {
        user: { id, admin, participantSince: chat.createdAt, status: "active" },
        chat: { id: chat._id },
      };
      chatRels.push(chatRel);
    }
    const chatUserRels = await Participant.create(chatRels);
    return res.status(201).send({
      data: {
        ...chat.toObject(),
        participants: chatUserRels.map((rel) => rel.user),
      },
    });
  } catch (e) {
    return res
      .status(500)
      .send({ ...errors.serverError, debugError: e.message });
  }
});

router.get("/chat", async (req, res) => {
  const { userId, type, user1Id, user2Id, nameContains } = req.query;
  let { offset, limit } = req.query;

  offset = Number(offset);
  limit = Number(limit);

  offset = !Number.isNaN(offset) || offset == null ? offset : 0;
  limit = !Number.isNaN(limit) || limit == null ? limit : 1000;

  let baseQueryParams = { type };
  // const nameContainsQuery = { $name };

  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val != null)
  );
  if (nameContains != null) {
    baseQueryParams = {
      ...baseQueryParams,
      //  ...nameContainsQuery
    };
  }

  if (type == "group") {
    if (user1Id || user2Id) {
      return res.status(400).send({
        error: {
          message: "You can't query by user1Id or user2Id when type is 'group'",
        },
      });
    }
  }
  if (userId & (user1Id || user2Id)) {
    return res.status(400).send({
      error: {
        message: "Field userId is incompatible with [user1Id, user2Id]",
      },
    });
  }
  let chatIds;
  if (userId) {
    const chatUserRels = await Participant.find({ "user.id": userId });
    chatIds = chatUserRels.map((rel) => rel.chat.id);
  }
  if (user1Id && user2Id) {
    const [queryUser1, queryUser2] =
      user1Id > user2Id ? [user1Id, user2Id] : [user2Id, user1Id];
    const individualRels = await IndividualRel.find({
      user1Id: queryUser1,
      user2Id: queryUser2,
    });
    chatIds = individualRels.map((rel) => rel.chatId);
  }

  try {
    let chats;
    const basePipeline = [
      {
        $lookup: {
          from: "messages",
          localField: "lastMessageId",
          foreignField: "_id",
          as: "lastMessage",
        },
      },
      {
        $unwind: {
          path: "$lastMessage",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          lastActionDate: {
            $ifNull: ["$lastMessage.sentAt", "$createdAt"],
          },
        },
      },
      {
        $sort: {
          lastActionDate: -1,
        },
      },
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "participants",
          localField: "_id",
          foreignField: "chat.id",
          pipeline: [
            {
              $project: {
                _id: 0,
                user: 1,
              },
            },
          ],
          as: "participants",
        },
      },
    ];
    if (userId || user1Id || user2Id) {
      chats = await Chat.aggregate([
        {
          $match: {
            _id: {
              $in: chatIds.map((chatId) => mongoose.Types.ObjectId(chatId)),
            },
            ...baseQueryParams,
          },
        },
        ...basePipeline,
      ]);
    } else {
      chats = await Chat.aggregate([
        {
          $match: {
            ...baseQueryParams,
          },
        },
        ...basePipeline,
      ]);
    }
    chats = chats.map((el) => {
      return {
        ...el,
        participants: el.participants.map((participant) => participant.user),
        // : el.participants.map((participant) => participant.userId),
      };
    });
    return res.send({ data: chats });
  } catch (e) {
    return res
      .status(500)
      .send({ ...errors.serverError, debugError: e.message });
  }
});

router.get("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).send({ error: { message: "Chat not found" } });
    }
    const participants = (await Participant.find({ "chat.id": id })).map(
      (par) => par.user
    );
    return res.send({ data: { ...chat.toObject(), participants } });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.put("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
    if (!chat) {
      return res.status(404).send({ error: { message: "Chat not found" } });
    }
    return res.send({ data: chat.toObject() });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByIdAndDelete(id);
    // const chat = await Chat.findById(id);
    // const chat = await Chat.findByIdAndUpdate(
    //   id,
    //   { status: "former" },
    //   { new: true }
    // );

    return res.status(204).send({ data: chat.toObject() });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
