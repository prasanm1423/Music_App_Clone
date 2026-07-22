require("dotenv").config();
const musicModel = require("../Models/music.models");
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
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (decod.role !== "artist") {
    return res.status(403).json({
      message: "Forbidden user",
    });
  }
  const { title } = req.body;
  const file = req.file;
}

//exports
module.exports = { createMusic };
