const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "chat",
  },
  userId: {
    type: String,
  },
});

participantSchema.index({ userId: 1, chatId: -1 }, { unique: true });

const ParticipantModel = mongoose.model("participant", participantSchema);

module.exports = ParticipantModel;
