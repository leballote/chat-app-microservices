function createErrorResponse(message, code, meta) {
  const out = { error: { message, code } };
  if (meta != undefined) {
    Object.assign(out.error, { meta });
  }
  return out;
}

module.exports = {
  createErrorResponse,
};
