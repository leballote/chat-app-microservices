const Message = require("../models/message.model");

const router = require("express").Router();

const errors = {
  serverError: { message: "Server Error" },
};

router.post("/message", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    return res.status(201).send({ data: message });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/message", async (req, res) => {
  const { chatId, userId, limit = 1000, offset = 0 } = req.query;

  let baseQueryParams = { chatId, userId };
  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([key, val]) => val != null)
  );

  try {
    const messages = await Message.find(baseQueryParams)
      .sort({ sentAt: 1 })
      .limit(limit)
      .skip(offset);
    return res.send({ data: messages });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/message/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    const message = await Message.findById(id);
    return res.send({ data: message });
  } catch (e) {
    res.status().send(errors.serverError);
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
    res.status(204).send({ data: message });
  } catch (e) {
    res.status().send(errors.serverError);
  }
});

module.exports = router;
