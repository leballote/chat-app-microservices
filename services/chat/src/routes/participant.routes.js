const Participant = require("../models/participant.model");
const Chat = require("../models/chat.model");
const mongoose = require("mongoose");

const router = require("express").Router();

const errors = {
  serverError: { error: { message: "Server Error" } },
  participantNotFound: { error: { message: "Participant not found" } },
};

router.post("/", async (req, res) => {
  //TODO: with this model you can add participants to non existent chats, and also add non existent participants, check if this is a problem
  const { chatId, userId } = req.body;
  try {
    const chat = Chat.findOne({ _id: chatId });
    if (!chat) {
      return res
        .status(400)
        .send({ error: { message: "This chat doesn't exist" } });
    }
    if (chat.type == "individual") {
      return res.status(400).send({
        error: {
          message: "Add participant is not allowed in individual chats",
        },
      });
    }
    const chatUserRel = await Participant.create({
      chatId,
      userId,
    });
    return res.send({ data: chatUserRel });
  } catch (e) {
    if (e.code === 11000) {
      return res
        .status(400)
        .send({ error: { message: "Unique key error", ...e } });
    }
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/", async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const chat = Chat.findOne({ _id: chatId });
    if (!chat) {
      return res
        .status(400)
        .send({ error: { message: "This chat doesn't exist" } });
    }
    if (chat.type == "individual") {
      return res.status(400).send({
        error: {
          message: "Deleting participants is not allowed in individual chats",
        },
      });
    }
    const chatUserRel = await Participant.deleteOne({
      chatId,
      userId,
    });
    return res.send({ data: chatUserRel });
  } catch (e) {
    if (e.code) {
      //TODO: I don't remember why was this here, but it doesn't seem handeled correctly
      return res.status(404).send({ error: { message: e } });
    }
    return res.status(500).send(errors.serverError);
  }
});

router.get("/", async (req, res) => {
  const { chatId, userId } = req.query;
  let baseQueryParams = { chatId, userId };
  baseQueryParams["chat.id"] = baseQueryParams.chatId; //baseQueryParams.chatId;
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

    if (!participants) {
      return res.status(404).send(errors.participantNotFound);
    }
    return res.send({ data: participants });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const participant = await Participant.findById(id);
    if (!participant) {
      return res.status(404).send(errors.participantNotFound);
    }
    return res.send({ data: participant });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
