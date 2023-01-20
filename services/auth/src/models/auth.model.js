const mongoose = require("mongoose");
const validatorLib = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const { InvalidPasswordError } = require("../errors/InvalidPasswordError");
const {
  UsernameCanNotHaveWhitespacesError,
} = require("../errors/UsernameCanNotHaveWhitespacesError");

const authUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: 20,
      validate: {
        validator: function (value) {
          const message = "Username cannot contain spaces.";
          if (/\s/.test(value)) {
            const error = new UsernameCanNotHaveWhitespacesError(message);
            error.code = "USERNAME_CANNOT_CONTAIN_WHITESPACES";
            throw error;
          }
        },
      },
    },
  },
  { timestamps: true }
);

authUserSchema.plugin(passportLocalMongoose, {
  limitAttempts: true,
  maxAttempts: 5,
  unlockInterval: 300_000, //5 mins
  usernameUnique: true,
  passwordValidator(password, cb) {
    if (!validatorLib.isStrongPassword(password)) {
      const errorMessage = `Password should be length 8, and contain at least one of each of the following: lowercase letter, uppercase letter, symbol and number.`;
      const error = new InvalidPasswordError(errorMessage);
      cb(error);
    }
    // return an empty cb() on success
    return cb();
  },
});

const AuthUserModel = mongoose.model("authUser", authUserSchema);

module.exports = AuthUserModel;
