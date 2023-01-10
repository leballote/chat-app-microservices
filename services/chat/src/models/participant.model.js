const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  user: {
    type: {
      _id: false,
      id: { type: String, required: true },
      admin: { type: Boolean, required: true },
      participantSince: { type: mongoose.SchemaTypes.Date, required: true },
    },
    required: true,
  },
  chat: {
    type: {
      _id: false,
      id: { type: mongoose.SchemaTypes.ObjectId, ref: "chat", required: true },
    },
    required: true,
  },
});

participantSchema.index({ "user.id": 1, "chat.id": -1 }, { unique: true });

const ParticipantModel = mongoose.model("participant", participantSchema);

module.exports = ParticipantModel;
