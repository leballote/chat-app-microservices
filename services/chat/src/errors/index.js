const { createErrorResponse } = require("./utils");

const appErrors = {
  serverError,
  clientError,
  duplicateKeyError,
  emailTakenError,
};
module.exports = {
  appErrors,
};

// general
const SERVER_ERROR = createErrorResponse("Server Error", "SERVER_ERROR");
const CLIENT_ERROR = createErrorResponse("Client error", "CLIENT_ERROR");

function serverError() {
  return SERVER_ERROR;
}

// signup
function clientError() {
  return CLIENT_ERROR;
}

function emailTakenError(email) {
  return createErrorResponse(
    `Email '${username}' is already taken`,
    "USERNAME_TAKEN",
    {
      email,
    }
  );
}

function duplicateKeyError(key, value) {
  return createErrorResponse(
    `${value} is already taken from unique field ${key}`,
    "DUPLICATE_ERROR",
    { key, value }
  );
}
