const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
const mentorignupSchema = new Schema({
  name: {
    type: "string",
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
  code :{
    type:"Number",
    required:true,
  },
  phoneno:{
    type:"Number",
    required:true,
  }
});
mentorignupSchema.pre("save", async function (next) {

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

mentorignupSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const mentor = mongoose.model("mentor", mentorignupSchema);

module.exports = mentor;
