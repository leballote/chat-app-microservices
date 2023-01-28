const { appErrors } = require(".");
const { AppError } = require("./throwable");
const { Error: MongooseError } = require("mongoose");
const { createErrorResponse } = require("./utils");

function defaultErrorHandler(error, _req, res) {
  const errors = Object.values(error.errors);
  const firstError = errors[0];
  if (firstError.reason instanceof AppError) {
    return res
      .status(400)
      .send({ ...firstError.reason, message: firstError.reason.message });
  }

  if (error.name == "MongoError" && error?.code === 11000) {
    if (error.keyValue !== undefined) {
      return res.status(400).send(appErrors.duplicateKeyError(error.keyValue));
    } else {
      //this code shouldn't be reached, but I still put a fallback
      return res.status(400).send(appErrors.clientError());
    }
  }
  if (error instanceof MongooseError.ValidationError) {
    const errors = error.errors;
    return res.status(400).send(
      createErrorResponse(error.message, "VALIDATION_ERROR", {
        validatorErrors: Object.entries(errors).map(([, value]) => {
          return {
            message: value.message,
            kind: value.kind,
            path: value.path,
            value: value.value,
          };
        }),
      })
    );
  }

  return res
    .status(500)
    .send({ ...appErrors.serverError(), debugError: error.message });
}

module.exports = {
  defaultErrorHandler,
};
