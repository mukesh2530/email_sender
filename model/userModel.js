const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  photo: String,
  email: {
    type: String,
    required: [true, 'please provide the email'],
    unique: true,
    lower: true,
    validate: [validator.isEmail, 'Please provide the valid mail'],
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minlenth: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm the password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not same.',
    },
  },
  passwordResetToken: String,
  passwordTokenExpires: Date,
});
// password encryption
userSchema.pre('save', async function (next) {
  // check if password is modified or created new then  encrypt
  if (!this.isModified('password')) return next();
  //   password hashed with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //   delete the confirm password
  this.passwordConfirm = undefined;
  next();
});
// instances method...
userSchema.methods.createPasswordResetToken = function () {
  resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordTokenExpires = Date.now() + 10 * 60 * 1000;
  //   console.log(resetToken, this.passwordResetToken);
  return resetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
