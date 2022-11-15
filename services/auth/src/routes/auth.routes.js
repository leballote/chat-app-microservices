const express = require("express");
const {
  loginMiddleware,
  signupMiddleware,
  jwtMiddleware,
} = require("../middlewares/passport");
const AuthUser = require("../models/auth.model");
//TODO: again, gather all the errors

const router = express.Router();

router.post("/signup", signupMiddleware, (req, res) => {
  return res.send({
    data: {
      success: true,
      user: {
        username: req.user.username,
        _id: req.user._id,
      },
    },
  });
});

router.post("/login", loginMiddleware, (req, res) => {
  return res.send({
    data: {
      success: true,
      user: { username: req.user.username, _id: req.user._id },
      token: req.token,
    },
  });
});

router.post("/auth", jwtMiddleware, (req, res) => {
  return res.send({
    data: {
      user: { username: req.user.username, _id: req.user._id },
    },
  });
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await AuthUser.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ error: { message: "User not found" } });
    }
  } catch (e) {
    return res.status(500).send({ error: { message: "Server error" } });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await AuthUser.findById(id);
    if (!user) {
      return res.status(404).send({ error: { message: "User not found" } });
    }
  } catch (e) {
    return res.status(500).send({ error: { message: "Server error" } });
  }
});

router.get("/user", async (req, res) => {
  const { username, limit = 1000, offset = 0 } = req.query;
  try {
    const users = await AuthUser.find({ username }).skip(offset).limit(limit);
    return res.send(users);
  } catch (e) {
    return res.status(500).send({ error: { message: "Server error" } });
  }
});

module.exports = router;
