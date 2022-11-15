const passport = require("passport");
const AuthUser = require("../../models/auth.model");
const jwt = require("jsonwebtoken");
const passportLocalMongooseErrors = require("passport-local-mongoose/lib/errors");

const JWT_SECRET = process.env.JWT_SECRET;

passport.use("login", AuthUser.createStrategy());

function loginMiddleware(req, res, next) {
  const pre = passport.authenticate("login", (err, user, info) => {
    //TODO: I don't know if I want't to send any message info that comes from local-passport-mongoose, but I'll let it like this
    if (info?.name in passportLocalMongooseErrors) {
      return res.send({ error: { message: info?.message } });
    }

    if (err || !user) {
      return res.send({ error: { message: "Something went wrong" } });
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
