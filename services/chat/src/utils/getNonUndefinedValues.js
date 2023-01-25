function getNonUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  );
}

module.exports = getNonUndefinedValues;
