const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: mongoose.SchemaTypes.Date,
    },
    //TODO: validate email
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phrase: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    //TODO: check if it is better to use mongoose.SchemaTypes.ObjectId
    //TODO: make validation for uniqueness within list
    friends: [{ type: String, ref: "user" }],
  },
  { timestamps: true, _id: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
