const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validatorLib = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");

const authUserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   minlength: 1,
    // },
    // password: {
    //   type: String,
    //   required: true,
    //   validate: {
    //     validator: validatorLib.isStrongPassword,
    //     message: () => {
    //       const errorMessage = `password should be length 8, and contain at least one of each of the following: lowercase letter, uppercase letter, symbol and number.`;
    //       const err = new Error(errorMessage);
    //       err.publicMessage = err.message;
    //       return err;
    //     },
    //   },
    // },
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
      const errorMessage = `password should be length 8, and contain at least one of each of the following: lowercase letter, uppercase letter, symbol and number.`;
      const error = new Error(errorMessage);
      error.publicMessage = errorMessage;
      cb(error);
    }
    // return an empty cb() on success
    return cb();
  },
});

// authUserSchema.pre("save", async function (next) {
//   const user = this;
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
//   next();
// });

// authUserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// };

const AuthUserModel = mongoose.model("authUser", authUserSchema);

module.exports = AuthUserModel;
