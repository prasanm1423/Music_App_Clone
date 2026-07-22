const mongoose = require("mongoose");

//music Schema
const musicSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

//model
const musicModel = mongoose.model("music", musicSchema);

//exports
module.exports = musicModel;
