require("dotenv").config();
const musicModel = require("../Models/music.models");
const { uploadFile } = require("../Services/storage.service");
const jwt = require("jsonwebtoken");

//music creation function
async function createMusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden user",
      });
    }
    const { title } = req.body;
    const file = req.file;

    //file Upload Procedures
    const result = await uploadFile(file.buffer.toString("base64"));
    const music = await musicModel.create({
      uri: result.uri,
      title,
      artist: decode.id,
    });
    res.status(201).json({
      message: "Music created and added Successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

//exports
module.exports = { createMusic };
