const express = require("express");
const {
  loginMiddleware,
  signupMiddleware,
  jwtMiddleware,
} = require("../middlewares/passport");

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

module.exports = router;
