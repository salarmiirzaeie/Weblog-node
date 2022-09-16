const mongoose = require("mongoose");
const { schema } = require("./secure/userValidation");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
// userSchema.pre("save",function(next){

// })
const User = mongoose.model("User", userSchema);
module.exports = User;
