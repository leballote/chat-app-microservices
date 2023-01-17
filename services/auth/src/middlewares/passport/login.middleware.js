const passport = require("passport");
const AuthUser = require("../../models/auth.model");
const jwt = require("jsonwebtoken");
const { appErrors } = require("../../errors");

const JWT_SECRET = process.env.JWT_SECRET;

passport.use("login", AuthUser.createStrategy());

function loginMiddleware(req, res, next) {
  const pre = passport.authenticate("login", (err, user, info) => {
    if (req.body.username === "" || req.body.password === "") {
      return res.status(401).send(appErrors.missingCredentialsError());
    }
    if (req.body.password === "") {
      return res.status(401).send(appErrors.missingPasswordError());
    }
    if (info?.name) {
      if (
        info.name === "IncorrectPasswordError" ||
        info.name === "IncorrectUsernameError"
      ) {
        return res.status(401).send(appErrors.incorrectCredentialsError());
      }
      if (info.name === "MissingUsernameError") {
        return res.status(400).send(appErrors.missingCredentialsError());
      }
      if (info.name === "MissingPasswordError") {
        return res.status(400).send(appErrors.missingCredentialsError());
      }
      if (info.name === "AttemptTooSoonError") {
        return res.status(401).send(appErrors.attemptTooSoonError());
      }
      if (info.name === "TooManyAttemptsError") {
        return res.status(429).send(appErrors.tooManyAttemptsError());
      }
    }

    if (err) {
      return res.status(500).send(appErrors.serverError());
    }

    if (!user) {
      return res.status(404).send(appErrors.authenticationError());
    }

    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);
      const body = { _id: user._id, username: user.username };
      const token = jwt.sign({ user: body }, JWT_SECRET);
      req.token = token;
      next();
    });
  });

  pre(req, res, next);
}

module.exports = loginMiddleware;
