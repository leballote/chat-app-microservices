class AppError extends Error {
  constructor(message, code, meta) {
    super(message);
    this.message = message;
    if (code != null) this.code = code;
    if (meta != null) this.meta = meta;
  }
}

class AppValidationError extends AppError {
  constructor(message, key, moreMeta) {
    super(message, "VALIDATION_ERROR", { key, ...moreMeta });
  }
}

class DuplicationError extends AppError {
  constructor(message, { key, value }, moreMeta) {
    super(message, "DUPLICATE_ERROR", { key, value, ...moreMeta });
  }
}

class NameCantHaveLeadingNorTrailingSpacesError extends AppError {
  constructor(message, moreMeta) {
    super(message, "NAME_CANT_HAVE_LEADING_NOR_TRAILING_SPACES", moreMeta);
  }
}

class NameCantHaveTwoConsecutiveSpacesError extends AppError {
  constructor(message, moreMeta) {
    super(message, "NAME_CANT_HAVE_TWO_CONSECUTIVE_SPACES", moreMeta);
  }
}

module.exports = {
  AppError,
  AppValidationError,
  DuplicationError,
  NameCantHaveLeadingNorTrailingSpacesError,
  NameCantHaveTwoConsecutiveSpacesError,
};
