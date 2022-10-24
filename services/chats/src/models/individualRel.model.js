const mongoose = require("mongoose");

const individualRelSchema = new mongoose.Schema({
  user1Id: {
    type: String,
    required: true,
  },
  user2Id: {
    type: String,
    required: true,
  },
  chatId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "chat",
  },
});

individualRelSchema.index({ user1Id: 1, user2Id: -1 }, { unique: true });

IndividualRelModel = mongoose.model("individualRel", individualRelSchema);

module.exports = IndividualRelModel;
