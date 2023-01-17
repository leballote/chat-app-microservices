const { appErrors } = require("../errors");
const { defaultErrorHandler } = require("../errors/defaultErrorHandler");
const User = require("../models/user.model");

const router = require("express").Router();

router.post("/user", async (req, res) => {
  const { id, username, name, birthDate, email, phrase, avatar } = req.body;
  try {
    const alreadyExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (alreadyExistingUser) {
      if (email && alreadyExistingUser.email == email) {
        return res.status(400).send(appErrors.duplicateKeyError({ email }));
      } else if (username && alreadyExistingUser.username == username) {
        return res.status(400).send(appErrors.duplicateKeyError({ username }));
      }
    }
    const user = await User.create({
      _id: id,
      username,
      name,
      birthDate,
      email,
      phrase: phrase ?? "",
      avatar,
      settings: {
        language: "en",
      },
    });
    return res.send({ data: user });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).populate("friends");
    if (!user) {
      return res.status(404).send(appErrors.notFoundError("user", { id }));
    }
    return res.send({ data: user });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.get("/user", async (req, res) => {
  const {
    limit = 1000,
    offset = 0,
    email,
    username,
    name,
    birthDate,
    birthDateLte,
    birthDateGte,
  } = req.query;
  //TODO: if needed fix the query by birthDate
  let baseQueryParams = {
    email,
    username,
    name,
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
    defaultErrorHandler(e, req, res);
  }
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  //TODO: I don't know if settings will be changed correctly example:
  //currentSetting = {language: "en", mode: "dark"} and I pass newSettings = {language: "es"}; would remove the mode?, or just wouldn't touch it
  const { name, birthDate, phrase, avatar, settings } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, birthDate, phrase, avatar, settings },
      { new: true }
    );
    if (!user) {
      return res.send(appErrors.notFoundError("user", { id }));
    }
    return res.send({ data: user });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.send(appErrors.notFoundError("user", { id }));
    }
    return res.send({ data: user });
  } catch (e) {
    defaultErrorHandler(e, req, res);
  }
});

module.exports = router;
