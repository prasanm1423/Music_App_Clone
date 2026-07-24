require("dotenv").config();
const musicModel = require("../Models/music.models");
const albumModel = require("../Models/album.model");
const { uploadFile } = require("../Services/storage.service");
const jwt = require("jsonwebtoken");

//music creation function
async function createMusic(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized user token",
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
    if (!file) {
      return res.status(400).json({
        message: "Music file is required",
      });
    }

    //file Upload Procedures
    const result = await uploadFile(file.buffer.toString("base64"));
    const music = await musicModel.create({
      uri: result.url,
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
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized user ",
    });
  }
}

//Music Album creation
async function createAlbum(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(401).json({
        message: "No acces Provided for the user",
      });
    }
    const { title, music } = req.body;
    const album = await albumModel.create({
      title,
      artist: decoded.id,
      music: music,
    });
    res.status(201).json({
      message: "Album created Successsfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.music,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
//exports
module.exports = { createMusic, createAlbum };
