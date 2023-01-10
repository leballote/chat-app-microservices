const { appErrors } = require(".");
// const { Error: MongooseError } = require("mongoose");
const { InvalidPasswordError } = require("./InvalidPasswordError");

function handleMongooseSignupErrors(err, _req, res) {
  if (err.name == "MongoError" && err?.code === 11000) {
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

  // if (err instanceof MongooseError.ValidationError) {
  //   const errorValue = Object.values(err)[0];
  //   return res
  //     .status(400)
  //     .send(appErrors.validationError(errorValue.message, "hey", "bye"));
  // }
  return null;
}

module.exports = {
  handleMongooseSignupErrors,
};
