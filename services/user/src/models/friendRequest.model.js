const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
  {
    from: { type: String, required: true, ref: "user" },
    to: { type: String, required: true, ref: "user" },
  },
  { timestamps: true }
);

friendRequestSchema.index({ from: 1, to: -1 });

const FriendRequestModel = mongoose.model("friendRequest", friendRequestSchema);

module.exports = FriendRequestModel;
