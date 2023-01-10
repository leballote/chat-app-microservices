class InvalidPasswordError extends Error {
  constructor(message) {
    super(message);
  }
}

exports.InvalidPasswordError = InvalidPasswordError;
