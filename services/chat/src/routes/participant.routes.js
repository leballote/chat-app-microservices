const Participant = require("../models/participant.model");
const Chat = require("../models/chat.model");
const { defaultErrorHandler } = require("../errors/defaultErrorHandler");
const { appErrors } = require("../errors");

const router = require("express").Router();

router.post("/multiple", async (req, res) => {
  const { participants, chatId } = req.body;
  try {
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) {
      return res
        .status(404)
        .send(appErrors.notFoundError("chat", { id: chatId }));
    }
    const chatRels = [];

    for (const { id, admin = false } of participants) {
      const chatRel = {
        user: { id, admin, participantSince: chat.createdAt },
        chat: { id: chat._id },
      };
      chatRels.push(chatRel);
    }
    await Participant.create(chatRels);
    const participantsAfter = await Participant.find({ "chat.id": chatId });
    return res.status(201).send({
      data: {
        ...chat.toObject(),
        participants: participantsAfter.map((rel) => rel.user),
      },
    });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.post("/", async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const chat = Chat.findOne({ _id: chatId });
    if (!chat) {
      return res
        .status(404)
        .send(appErrors.notFoundError("chat", { id: chatId }));
    }
    if (chat.type == "individual") {
      return res
        .status(400)
        .send(
          appErrors.clientError(
            "Add participant is not allowed in individual chats",
            { chatId, userId }
          )
        );
    }
    const chatUserRel = await Participant.create({
      chatId,
      userId,
    });
    return res.send({ data: chatUserRel });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.delete("/", async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const chat = Chat.findOne({ _id: chatId });
    if (!chat) {
      return res
        .status(404)
        .send(appErrors.notFoundError("chat", { id: chatId }));
    }
    if (chat.type == "individual") {
      return res
        .status(400)
        .send(
          appErrors.clientError(
            "Deleting participant is not allowed in individual chats",
            { userId, chatId }
          )
        );
    }
    const chatUserRel = await Participant.findOneAndDelete({
      "chat.id": chatId,
      "user.id": userId,
    });
    if (!chatUserRel) {
      return res.send(
        appErrors.notFoundError("participant", { chatId, userId })
      );
    }
    return res.send({ data: chatUserRel });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.get("/", async (req, res) => {
  const { chatId, userId } = req.query;
  let baseQueryParams = { chatId, userId };
  baseQueryParams["chat.id"] = baseQueryParams.chatId;
  baseQueryParams["user.id"] = baseQueryParams.userId;
  baseQueryParams.chatId = undefined;
  baseQueryParams.userId = undefined;
  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val !== undefined)
  );
  try {
    const participants = (await Participant.find(baseQueryParams)).map(
      (participant) => participant.user
    );

    return res.send({ data: participants });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const participant = await Participant.findById(id);
    if (!participant) {
      return res
        .status(404)
        .send(appErrors.notFoundError("participant", { id }));
    }
    return res.send({ data: participant });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

module.exports = router;
