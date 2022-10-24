const User = require("../models/user.model");

const router = require("express").Router();

const errors = {
  serverError: { message: "Server error" },
  userNotFound: { message: "User not found" },
};

router.post("/user", async (req, res) => {
  const { id, username, name, birthDate, email } = req.body;
  try {
    const user = await User.create({
      _id: id,
      username,
      name,
      birthDate,
      email,
    });
    return res.send({ data: user });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send(errors.userNotFound);
    }
    return res.send({ data: user });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.get("/user", async (req, res) => {
  const {
    limit = 1000,
    offset = 0,
    email,
    birthDate,
    birthDateLte,
    birthDateGte,
  } = req.query;
  //TODO: if needed fix the query by birthDate
  let baseQueryParams = {
    email,
    birthDate,
    // $and: [
    //   birthDate,
    //   { birthDate: { $lte: birthDateLte } },
    //   { birthDate: { $gte: birthDateGte } },
    // ].filter((el) => !el.birthDate),
  };

  baseQueryParams = Object.fromEntries(
    Object.entries(baseQueryParams).filter(([, val]) => val != null)
  );

  try {
    const users = await User.find(baseQueryParams)
      .skip(offset)
      .limit(limit)
      .populate("friends");
    return res.send({ data: users });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthDate, email } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, birthDate, email },
      { new: true }
    );
    if (!user) {
      return res.send({ message: errors.userNotFound });
    }
    return res.send({ data: user });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.send({ message: errors.userNotFound });
    }
    return res.send({ data: user });
  } catch (e) {
    return res.status(500).send(errors.serverError);
  }
});

module.exports = router;
