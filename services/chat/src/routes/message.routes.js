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
  const { chatId, userId, start, afterDate = 0, limit = 1000 } = req.query;
  let { offset } = req.query;
  const afterDate_ = new Date(afterDate);

  if (start != null && offset != null) {
    return res.send({
      error: {
        message: "Can only paginate by one of the following: offset, start",
      },
    });
  }
  offset = 0;

  let baseQueryParams = { chatId, userId };
  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val != null)
  );

  let findObject = {
    ...baseQueryParams,
    sentAt: { $gt: new Date(afterDate_) },
  };

  try {
    let messages;
    if (start != null) {
      const startMessage = await Message.findById(start);
      if (!startMessage) {
        return res
          .status(400)
          .send({ error: { message: "Cursor 'start' not found" } });
      }
      messages = await Message.find({
        ...baseQueryParams,
        $or: [
          { sentAt: { $lt: new Date(startMessage.sentAt) } },
          {
            sentAt: new Date(startMessage.sentAt),
            _id: { $gt: new mongoose.Types.ObjectId(startMessage._id) },
          },
        ],
        _id: { $ne: mongoose.Types.ObjectId(start) },
        sentAt: { $gt: new Date(afterDate_) },
      })
        .sort({ sentAt: -1, _id: 1 })
        .limit(limit);
    } else {
      messages = await Message.find(findObject)
        .sort({ sentAt: -1, _id: 1 })
        .limit(limit)
        .skip(offset);
    }

    return res.send({ data: messages });
  } catch (e) {
    return res
      .status(500)
      .send({ ...errors.serverError, debugError: e.message });
  }
});

router.get("/message/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).send(errors.messageNotFound);
    }
    return res.send({ data: message });
  } catch (e) {
    return res
      .status(500)
      .send({ error: errors.serverError, debugError: e.message });
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
