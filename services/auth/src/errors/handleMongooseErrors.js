const { appErrors } = require(".");
const { Error: MongooseError } = require("mongoose");
const { InvalidPasswordError } = require("./InvalidPasswordError");
const {
  UsernameCanNotHaveWhitespacesError,
} = require("../errors/UsernameCanNotHaveWhitespacesError");

function handleMongooseSignupErrors(err, _req, res) {
  if (err?.name == "MongoError" && err?.code === 11000) {
    if (err.keyValue.username !== undefined) {
      return res
        .status(400)
        .send(appErrors.usernameTakenError(err.keyValue.username));
    } else {
      return res.status(400).send(appErrors.clientError());
    }
  }

  if (err instanceof InvalidPasswordError) {
    return res.status(400).send(appErrors.invalidPasswordError(err.message));
  }

  if (err instanceof MongooseError.ValidationError) {
    const errorValue = Object.values(err)[0];
    if (
      errorValue.username.reason instanceof UsernameCanNotHaveWhitespacesError
    ) {
      return res
        .status(400)
        .send(appErrors.usernameCanNotHaveWhitespacesError());
    }
    return res.status(400).send(appErrors.clientError());
  }
  return null;
}

module.exports = {
  handleMongooseSignupErrors,
};
