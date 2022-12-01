const FriendRequestModel = require("../models/friendRequest.model");
const UserModel = require("../models/user.model");

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
  youAreAlreadyFriends: {
    error: { message: "You are already friends" },
  },
};

router.post("/friendshipRequest", async (req, res) => {
  const { from, to } = req.body;
  try {
    if (from == to) {
      return res.status(400).send(errors.cannotRequestFriendshipToYourself);
    }
    const [friendReq, user1] = await Promise.all([
      FriendRequestModel.findOne({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }),
      UserModel.findById(from),
    ]);

    if (friendReq?.from == from) {
      return res.status(400).send(errors.youAlreadyRequestedFriendship);
    }
    if (friendReq?.to == from) {
      return res.status(400).send(errors.heAlreadyRequestedFriendship);
    }
    if (user1.friends.includes(to)) {
      return res.status(400).send(errors.youAreAlreadyFriends);
    }

    const friendshipRequest = await FriendRequestModel.create({
      from,
      to,
    });

    return res.send({ data: { success: true, ...friendshipRequest } });
  } catch (e) {
    return res
      .status(500)
      .send({ ...errors.serverError, debugError: e.message });
  }
});

router.get("/friendshipRequest", async (req, res) => {
  const { from, to } = req.query;
  let baseQueryParams = { from, to };

  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val != null)
  );

  try {
    const friendshipRequest = await FriendRequestModel.find(baseQueryParams);

    return res.send({
      data: friendshipRequest,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ ...errors.serverError, debugError: e.message });
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
