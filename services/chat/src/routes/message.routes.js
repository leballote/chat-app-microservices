//TODO: this doesn't seem to handle errors correctly
const { default: mongoose } = require("mongoose");
const Chat = require("../models/message.model");
const Message = require("../models/message.model");

const router = require("express").Router();

const errors = {
  serverError: { error: { message: "Server Error" } },
  messageNotFound: { error: { message: "Message not found" } },
};

router.post("/message", async (req, res) => {
  try {
    const { chatId } = req.body;
    const message = await Message.create(req.body);
    await Chat.findOneAndUpdate(
      { _id: chatId },
      { lastMessage: message._id },
      { new: true }
    );
    return res.status(201).send({ data: message });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/message", async (req, res) => {
  const { chatId, userId, afterDate = 0, limit = 1000, offset = 0 } = req.query;
  const afterDate_ = new Date(afterDate);

  let baseQueryParams = { chatId, userId };
  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([key, val]) => val != null)
  );

  const findObject = {
    ...baseQueryParams,
    sentAt: { $gt: new Date(afterDate_) },
  };

  try {
    const messages = await Message.find(findObject)
      .sort({ sentAt: 1 })
      .limit(limit)
      .skip(offset);
    console.log(messages);
    return res.send({ data: messages });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/message/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).send(errors.messageNotFound);
    }
    return res.send({ data: message });
  } catch (e) {
    return res.status().send(errors.serverError);
  }
});

router.put("/message/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const message = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.send({ data: message });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/message/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const message = await Message.findByIdAndDelete(id);
    return res.status(204).send({ data: message });
  } catch (e) {
    return res.status().send(errors.serverError);
  }
});

module.exports = router;
