const signupMiddleware = require("./signup.middleware");
const loginMiddleware = require("./login.middleware");
const jwtMiddleware = require("./jwt.middleware");

module.exports = {
  loginMiddleware,
  signupMiddleware,
  jwtMiddleware,
};
