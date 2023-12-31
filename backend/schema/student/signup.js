const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
var Schema = mongoose.Schema;
const studentsignupSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  phoneno: {
    type: "Number",
    required: true,
    },
  emailid: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  id:{
type:"Number",
default: -1,
  },
  passwordChangedAt :Date,
resetPasswordToken :{
type:"string",
},
passwordresetexpired :Date,
});

studentsignupSchema.pre("save", async function (next) {

  this.password = await bcrypt.hash(this.password, 12);
  next();
});
studentsignupSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
})
studentsignupSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
studentsignupSchema.methods.createpasswordresetpassword =function () {
  // const resetToken =crypto.randomBytes(32).toString('hex');
const resetToken = Math.floor(Math.random() *100000)+ 100000
  // this.resetPasswordToken =  crypto.createHash('sha256').update(resetToken).digest('hex')
this.resetPasswordToken = resetToken;
  console.log({resetToken},this.resetPasswordToken);

  this.passwordresetexpired = Date.now() + 600000;

  return resetToken;
}
const signup = mongoose.model("student", studentsignupSchema);

module.exports = signup;
