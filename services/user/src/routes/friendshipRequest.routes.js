const FriendRequestModel = require("../models/friendRequest.model");

const router = require("express").Router();

const errors = {
  serverError: { error: { message: "Server error" } },
  cannotRequestFriendshipToYourself: {
    error: { message: "Cannot request frienship to yourself" },
  },
  youAlreadyRequestedFriendship: {
    error: { message: "You already requested friendship" },
  },
  heAlreadyRequestedFriendship: {
    error: { message: "He already requested friendship" },
  },
  friendshipRequestNotFound: {
    error: { message: "Friendship request not found" },
  },
};

router.post("/friendshipRequest", async (req, res) => {
  const { from, to } = req.body;
  try {
    if (from == to) {
      return res.status(400).send(errors.cannotRequestFriendshipToYourself);
    }
    const friendReq = await FriendRequestModel.findOne({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    });
    if (friendReq.from == from) {
      return res.status(400).send(errors.youAlreadyRequestedFriendship);
    }
    if (friendReq.to == from) {
      return res.status(400).send(errors.heAlreadyRequestedFriendship);
    }

    const friendshipRequest = await FriendRequestModel.create({
      from,
      to,
    });

    return res.send({ data: { success: true, ...friendshipRequest } });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/friendshipRequest", async (req, res) => {
  const { from, to } = req.body;
  try {
    const friendshipRequest = await FriendRequestModel.findOneAndDelete({
      from,
      to,
    });
    if (!friendshipRequest) {
      return res.status(404).send(errors.friendshipRequestNotFound);
    }

    return res.send({ data: { success: true, ...friendshipRequest } });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
