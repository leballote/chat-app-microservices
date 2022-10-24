const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const AuthUser = require("../../models/auth.model");
const { Error: MongooseError } = require("mongoose");

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
    if (err?.code === 11000) {
      return res.status(400).send({ error: "Username already exists" });
    }

    if (err?.publicMessage) {
      return res.status(400).send({ error: err.publicMessage });
    }

    if (err instanceof MongooseError.ValidationError) {
      if (err.errors.password) {
        return res.status(400).send({ error: err.errors.password.message });
      }
      //TODO: if there is a validation error, see what provides more information and wether it is possible tu just send the messages
      const errorValue = Object.values(err)[0];
      return res.status.send({ error: errorValue.message });
    }

    if (err || !user) {
      // console.log("USER: ", err);
      return res.status(500).send({ error: "Another error" });
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
