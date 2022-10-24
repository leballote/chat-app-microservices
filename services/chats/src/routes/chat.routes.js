const Chat = require("../models/chat.model");
const Participant = require("../models/participant.model");
const IndividualRel = require("../models/individualRel.model");

const router = require("express").Router();

const errors = {
  serverError: { message: "Server Error" },
};

//TODO: I think this could have been way easier with two models for individual chats and group chats
router.post("/chat", async (req, res) => {
  const { name, type, phrase } = req.body;
  const chatData = { name, type, phrase };
  const { participants } = req.body;

  const user1Id =
    participants[0] > participants[1] ? participants[0] : participants[1];
  const user2Id =
    participants[0] > participants[1] ? participants[1] : participants[0];
  if (participants.length < 2) {
    return res
      .status(400)
      .send({ message: "Participants must be at least two" });
  }
  if (type == "individual") {
    if (name || phrase) {
      return res.status(400).send({
        message: "Individual chats cannot have a name or phrase",
      });
    }
    if (participants.length > 2) {
      return res.status(400).send({
        message: "For individual chats there must be at most two participants",
      });
    }

    //TODO: we should also handle unique key error; see how you handeled it before in auth
    console.log(user1Id, user2Id);
    try {
      const individualRel = await IndividualRel.findOne({
        user1Id,
        user2Id,
      });
      if (individualRel) {
        return res.status(400).send({
          message:
            "There can only be one individual chat between two users. There already exists one",
          data: { chatId: individualRel.chatId },
        });
      }
    } catch (e) {
      return res.status(500).send(errors.serverError);
    }
  }

  try {
    const chat = await Chat.create(chatData);
    //there should not be  unique key error because it is handeled before
    if (type == "individual") {
      await IndividualRel.create({
        user1Id,
        user2Id,
        chatId: chat._id,
      });
    }
    const chatRels = [];
    for (const userId of participants) {
      const chatRel = { userId, chatId: chat._id };
      chatRels.push(chatRel);
    }
    const chatUserRels = await Participant.create(chatRels);
    return res.status(201).send({
      data: {
        ...chat.toObject(),
        participants: chatUserRels.map((rel) => rel.userId),
      },
    });
  } catch (e) {
    //TODO: handle correctly errors
    return res.status(500).send({ ...errors.serverError, debugError: e });
  }
});

router.get("/chat", async (req, res) => {
  const { userId, type, user1Id, user2Id } = req.query;
  let { offset, limit } = req.query;

  offset = Number(offset);
  limit = Number(limit);

  console.log("OFFSET: ", offset);
  offset = !Number.isNaN(offset) || offset == null ? offset : 0;
  limit = !Number.isNaN(limit) || limit == null ? limit : 1000;
  console.log("OFFSET: ", offset);

  let baseQueryParams = { type };
  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val != null)
  );

  if (type == "group") {
    if (user1Id || user2Id) {
      return res.status(400).send({
        message: "You can't query by user1Id or user2Id when type is 'group'",
      });
    }
  }
  if (userId & (user1Id | user2Id)) {
    return res.status(400).send({
      message: "Field userId is incompatible with [user1Id, user2Id]",
    });
  }
  let chatIds;
  if (userId) {
    const chatUserRels = await Participant.find({ userId });
    chatIds = chatUserRels.map((rel) => rel.chatId);
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
        $sort: { createdAt: -1 },
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
          foreignField: "chatId",
          pipeline: [
            {
              $project: {
                _id: 0,
                userId: 1,
              },
            },
          ],
          as: "participants",
        },
      },
    ];
    if (userId | user1Id | user2Id) {
      chats = await Chat.aggregate([
        {
          $match: {
            _id: { $in: chatIds },
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
        participants: el.participants.map((participant) => participant.userId),
      };
    });
    return res.send({ data: chats });
  } catch (e) {
    console.log("ERROR: ", e);
    return res.status(500).send({ ...errors.serverError, debugError: e });
  }
});

router.get("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).send({ message: "Chat not found" });
    }
    const participants = (await Participant.find({ chatId: id })).map(
      (par) => par.userId
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
      return res.status(404).send({ message: "Chat not founc" });
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
    return res.status(204).send({ data: chat.toObject() });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.post("/participant", async (req, res) => {
  //TODO: with this model you can add participants to non existent chats, and also add non existent participants, check if this is a problem
  const { chatId, userId } = req.body;
  try {
    const chat = Chat.findOne({ _id: chatId });
    if (!chat) {
      return res.status(400).send({ message: "This chat doesn't exist" });
    }
    if (chat.type == "individual") {
      return res.status(400).send({
        message: "Add participant is not allowed in individual chats",
      });
    }
    const chatUserRel = await Participant.create({
      chatId,
      userId,
    });
    return res.send({ data: chatUserRel });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({ message: "Unique key error", ...e });
    }
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/participant", async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const chat = Chat.findOne({ _id: chatId });
    if (!chat) {
      return res.status(400).send({ message: "This chat doesn't exist" });
    }
    if (chat.type == "individual") {
      return res.status(400).send({
        message: "Deleting participants is not allowed in individual chats",
      });
    }
    const chatUserRel = await Participant.deleteOne({
      chatId,
      userId,
    });
    return res.send({ data: chatUserRel });
  } catch (e) {
    if (e.code) {
      return res.status(404).send(e);
    }
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
