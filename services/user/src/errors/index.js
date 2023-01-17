const { createErrorResponse } = require("./utils");

const appErrors = {
  serverError,
  clientError,
  duplicateKeyError,
  validationError,
  notFoundError,
  queryError,
  friendshipRequestAlreadySent,
  heAlreadyRequestedFriendship,
  cannotRequestFriendshipToYourself,
  youAreAlreadyFriends,
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
  const out = createErrorResponse(
    message ?? `${JSON.stringify(keyValue)} is duplicated`,
    "DUPLICATE_ERROR",
    { keyValue }
  );
  return out;
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

function friendshipRequestAlreadySent({ from, to }) {
  return createErrorResponse(
    "You already requested friendship",
    "FRIENDHIP_REQUEST_ALREADY_SENT_ERROR",
    { from, to }
  );
}

function heAlreadyRequestedFriendship({ from, to }) {
  return createErrorResponse(
    "He already requested friendship",
    "FRIENDHIP_REQUEST_ALREADY_RECEIVED_ERROR",
    { from, to }
  );
}

function cannotRequestFriendshipToYourself() {
  return createErrorResponse(
    "Cannot request frienship to yourself",
    "CANNOT_REQUEST_FRIENDSHIP_TO_YOURSELF_ERROR"
  );
}

function youAreAlreadyFriends({ from, to }) {
  return createErrorResponse(
    "You are already friends",
    "YOU_ARE_ALREADY_FRIENDS_ERROR",
    { from, to }
  );
}
