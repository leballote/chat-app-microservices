const { Promise } = require("mongoose");
const FriendRequestModel = require("../models/friendRequest.model");
const User = require("../models/user.model");

const router = require("express").Router();

const errors = {
  serverError: { error: { message: "Server error" } },
  friendshipNotFound: { error: { message: "Friendship not found" } },
  friendshipNotFound: { error: { message: "User not found" } },
};

router.post("/friendship", async (req, res) => {
  const { user1Id, user2Id } = req.body;
  try {
    const [user1, user2] = await Promise.all([
      User.findOne({ _id: user1Id }),
      User.findOne({ _id: user2Id }),
    ]);

    if (!user1 || !user2) {
      return res.status(404).send(errors.userNotFound);
    }

    if (user1.friends.includes(user2._id)) {
      return res.status(400).send({ error: { message: "Already friends" } });
    }

    user1.friends.push(user2._id);
    user2.friends.push(user1._id);

    await Promise.all([user1.save(), user2.save()]);
    //doesn't need to await this since is not necessary for returning
    await FriendRequestModel.deleteOne({
      $or: [
        { from: user1._id, to: user2._id },
        { from: user2._id, to: user1._id },
      ],
    });
    return res.send({ data: { success: true } });
  } catch (e) {
    return res
      .status(500)
      .send({ ...errors.serverError, debugError: e.message });
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
    return res.send({ data: { success: true } });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
