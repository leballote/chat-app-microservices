const { Promise } = require("mongoose");
const User = require("../models/user.model");

const router = require("express").Router();

const errors = {
  serverError: { error: { message: "Server error" } },
  friendshipNotFound: { error: { message: "friendship not found" } },
};

router.post("/friendship", async (req, res) => {
  const { user1Id, user2Id } = req.body;
  try {
    const [user1, user2] = await Promise.all([
      User.findOne({ _id: user1Id }),
      User.findOne({ _id: user2Id }),
    ]);

    if (user1.friends.includes(user2._id)) {
      res.status(400).send({ error: { message: "Already friends" } });
    }

    user1.friends.push(user2._id);
    user2.friends.push(user1._id);

    await Promise.all([user1.save(), user2.save()]);
    return res.send({ success: true });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/friendship", async (req, res) => {
  const { user1Id, user2Id } = req.body;
  try {
    const [user1, user2] = await Promise.all([
      User.findOne({ _id: user1Id }),
      User.findOne({ _id: user2Id }),
    ]);

    user1.friends.pull(user2._id);
    user2.friends.pull(user1._id);
    await Promise.all([user1.save(), user2.save()]);
    return res.send({ success: true });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
