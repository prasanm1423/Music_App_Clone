const mongoose = require("mongoose");

//user Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//user model and export
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
