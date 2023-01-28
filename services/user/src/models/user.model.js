const mongoose = require("mongoose");
const {
  NameCantHaveLeadingNorTrailingSpacesError: NameCantHaveTrailingSpacesError,
  NameCantHaveTwoConsecutiveSpacesError,
} = require("../errors/throwable");

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
      maxlength: 20,
      unique: true,
    },
    name: {
      type: String,
      maxlength: 120,
      minlength: 1,
      required: true,
      validate: [
        {
          validator: (name) => {
            const isValid = new RegExp("^(?!\\s)(.*)(?<!\\s)$").test(name);
            if (!isValid) {
              throw new NameCantHaveTrailingSpacesError(
                "Name cannot have leading nor trailing spaces"
              );
            }
          },
        },
        {
          validator: (name) => {
            const isNotValid = new RegExp("\\s{2,}").test(name);
            if (isNotValid) {
              throw new NameCantHaveTwoConsecutiveSpacesError(
                "Name cannot have two consecutive spaces"
              );
            }
          },
        },
      ],
    },
    birthDate: {
      type: mongoose.SchemaTypes.Date,
    },
    //TODO: validate email
    email: {
      type: String,
      required: true,
      maxlength: 320,
      unique: true,
    },
    phrase: {
      type: String,
      maxlength: 50,
      required: true,
    },
    avatar: {
      type: String,
    },
    //TODO: check if it is better to use mongoose.SchemaTypes.ObjectId
    //TODO: make validation for uniqueness within list; note, it is already being managed by the controller
    friends: [{ type: String, ref: "user" }],
    settings: {
      type: { language: { type: String } },
      required: true,
    },
  },
  { timestamps: true, _id: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
