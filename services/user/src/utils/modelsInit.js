async function initModels() {
  require("../models/friendRequest.model").init();
  require("../models/user.model").init();
}
module.exports = initModels;
