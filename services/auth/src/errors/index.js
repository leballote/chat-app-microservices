const { createErrorResponse } = require("./utils");

const appErrors = {
  serverError,
  usernameTakenError,
  validationError,
  incorrectCredentialsError,
  authenticationError,
  attemptTooSoonError,
  tooManyAttemptsError,
  missingCredentialsError,
  clientError,
  duplicateKeyError,
  invalidPasswordError,
};
module.exports = {
  appErrors,
};

// general
const SERVER_ERROR = createErrorResponse("Server Error", "SERVER_ERROR");
const INCORRECT_CREDENTIALS_ERROR = createErrorResponse(
  "Incorrect credentials",
  "INCORRECT_CREDENTIALS"
);
const NOT_AUTHENTICATED_ERROR = createErrorResponse(
  "Not authenticated",
  "NOT_AUTHENTICATED"
);
const ATTEMPT_TOO_SOON_ERROR = createErrorResponse(
  "Login attempts too soon",
  "ATTEMPT_TOO_SOON"
);

const TOO_MANY_ATTEMPTS_ERROR = createErrorResponse(
  "Too many attempts",
  "TOO_MANY_ATTEMPTS"
);

const MISSING_CREDENTIALS_ERROR = createErrorResponse(
  "Missing credentials",
  "MISSING_CREDENTIALS"
);

const CLIENT_ERROR = createErrorResponse("Client error", "CLIENT_ERROR");

function serverError() {
  return SERVER_ERROR;
}

// signup
function clientError() {
  return CLIENT_ERROR;
}

function usernameTakenError(username) {
  return createErrorResponse(
    `Username '${username}' is already taken`,
    "USERNAME_TAKEN",
    {
      username,
    }
  );
}

function invalidPasswordError(message) {
  return createErrorResponse(message, "INVALID_PASSWORD");
}

// login
function incorrectCredentialsError() {
  return INCORRECT_CREDENTIALS_ERROR;
}

//jwt
function authenticationError() {
  return NOT_AUTHENTICATED_ERROR;
}

function attemptTooSoonError() {
  return ATTEMPT_TOO_SOON_ERROR;
}

function tooManyAttemptsError() {
  return TOO_MANY_ATTEMPTS_ERROR;
}

function missingCredentialsError() {
  return MISSING_CREDENTIALS_ERROR;
}

function validationError(message, key, value) {
  return createErrorResponse(message, "VALIDATION_ERROR", {
    key,
    value,
  });
}

function duplicateKeyError(key, value) {
  return createErrorResponse(
    `${value} is already taken from unique field ${key}`,
    "DUPLICATE_ERROR",
    { key, value }
  );
}
