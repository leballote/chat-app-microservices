const passport = require("passport");
const { appErrors } = require("../../errors");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const AuthUser = require("../../models/auth.model");

const JWT_SECRET = process.env.JWT_SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromBodyField("token"),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    try {
      const user = await AuthUser.findOne({ username: payload.user.username });
      if (!user) return done(null, false, appErrors.authenticationError());
      return done(null, user);
    } catch (error) {
      done(appErrors.serverError());
    }
  })
);

function jwtMiddleware(req, res, next) {
  const pre = passport.authenticate("jwt", function (err, user) {
    if (err) {
      return res.send(appErrors.serverError());
    }
    if (!user) {
      return res.send(appErrors.authenticationError());
    }

    req.login(user, { session: false }, function (err) {
      if (err) next(err);
      else next();
    });
  });

  pre(req, res, next);
}

module.exports = jwtMiddleware;
