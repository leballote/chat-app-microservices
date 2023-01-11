const { createErrorResponse } = require("./utils");

const appErrors = {
  serverError,
  clientError,
  duplicateKeyError,
  emailTakenError,
  validationError,
  notFoundError,
  queryError,
};
module.exports = {
  appErrors,
};

// general
const SERVER_ERROR = createErrorResponse("Server Error", "SERVER_ERROR");

function serverError() {
  return SERVER_ERROR;
}

// signup
function clientError(message, meta) {
  return createErrorResponse(message ?? "Client error", "CLIENT_ERROR", meta);
}

function emailTakenError(email) {
  return createErrorResponse(
    `Email '${email}' is already taken`,
    "USERNAME_TAKEN",
    {
      email,
    }
  );
}

function validationError(key, value, createMessage) {
  let message = null;
  if (createMessage != null) {
    message = createMessage(key, value);
  }
  return createErrorResponse(
    message ?? `Field ${key}, cannot take value: ${value}`,
    "VALIDATION_ERROR",
    {
      key,
      value,
    }
  );
}

function duplicateKeyError(keyValue, createMessage) {
  let message;
  if (createMessage != null) {
    message = createMessage(keyValue);
  }
  return createErrorResponse(
    message ?? `${JSON.stringify(keyValue)} is duplicated`,
    "DUPLICATE_ERROR",
    { keyValue }
  );
}

function notFoundError(resource, moreMeta = {}, createMessage) {
  let message;
  if (createMessage != null) {
    message = createMessage(resource, moreMeta);
  }
  message = message ?? `${resource} not found`;
  return createErrorResponse(message, "NOT_FOUND_ERROR", {
    resource,
    ...moreMeta,
  });
}

function queryError(resource, keys, moreMeta = {}, createMessage) {
  let message;
  if (createMessage != null) {
    message = createMessage(resource, moreMeta);
  }
  message = message ?? `Invalid format for ${keys} in resource ${resource}`;
  return createErrorResponse(message, "QUERY_ERROR", {
    resource,
    keys,
    ...moreMeta,
  });
}
