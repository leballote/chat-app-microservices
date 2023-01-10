const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const AuthUser = require("../../models/auth.model");
const { appErrors } = require("../../errors");
const {
  handleMongooseSignupErrors,
} = require("../../errors/handleMongooseErrors");

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = new AuthUser({ username });
        await user.setPassword(password);
        await user.save();
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

function signupMiddleware(req, res, next) {
  const pre = passport.authenticate("signup", function (err, user) {
    if (handleMongooseSignupErrors(err, req, res)) {
      return;
    }

    if (err || !user) {
      return res.status(500).send(appErrors.serverError());
    }
    req.login(user, { session: false }, (err) => {
      if (err) next(err);
      else next();
    });
  });

  pre(req, res, next);
}

module.exports = signupMiddleware;

// It doesn't need to be exported, it will set up passport.authenticate("signup")
