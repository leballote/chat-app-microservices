const Chat = require("../models/chat.model");
const Participant = require("../models/participant.model");
const IndividualRel = require("../models/individualRel.model");
const { default: mongoose } = require("mongoose");
const { defaultErrorHandler } = require("../errors/defaultErrorHandler");
const { appErrors } = require("../errors");

const router = require("express").Router();

router.post("/chat", async (req, res) => {
  const { name, type, phrase } = req.body;

  const { participants } = req.body;

  try {
    const chat = await Chat.createChat({ name, type, phrase, participants });

    return res.status(201).send({
      data: chat,
    });
  } catch (e) {
    return defaultErrorHandler(e, req, res);
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

  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val != null)
  );
  if (nameContains != null) {
    baseQueryParams = {
      ...baseQueryParams,
    };
  }

  if (type == "group") {
    if (user1Id || user2Id) {
      return res
        .status(400)
        .send(
          appErrors.queryError(
            "chat",
            ["user1Id", "user2Id"],
            undefined,
            () => "You can't query by user1Id or user2Id when type is 'group'"
          )
        );
    }
  }
  if (userId && (user1Id || user2Id)) {
    return res
      .status(400)
      .send(
        appErrors.queryError(
          "chat",
          ["userId", "user1Id", "user2Id"],
          undefined,
          () => "Field userId is incompatible with [user1Id, user2Id]"
        )
      );
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
    return defaultErrorHandler(e, req, res);
  }
});

router.get("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).send(appErrors.notFoundError("chat", { id }));
    }
    const participants = (await Participant.find({ "chat.id": id })).map(
      (par) => par.user
    );
    return res.send({ data: { ...chat.toObject(), participants } });
  } catch (e) {
    return defaultErrorHandler(e, req, res);
  }
});

router.put("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
    if (!chat) {
      return res.status(404).send(appErrors.notFoundError("chat", { id }));
    }
    return res.send({ data: chat.toObject() });
  } catch (e) {
    return defaultErrorHandler(e, req, res);
  }
});

router.delete("/chat/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) {
      return res.status(404).send(appErrors.notFoundError("chat", { id }));
    }

    return res.status(204).send({ data: chat.toObject() });
  } catch (e) {
    return defaultErrorHandler(e, req, res);
  }
});

module.exports = router;
