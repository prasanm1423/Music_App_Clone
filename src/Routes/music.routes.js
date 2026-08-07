const express = require("express");
const musicController = require("../Controllers/music.controller");
const authMiddleware=require("../middleware/auth.middleware")
const multer = require("multer");
const router = express.Router();

//multer uplod
const upload = multer({
  storage: multer.memoryStorage(),
});
//Routes
router.post("/upload",authMiddleware.authArtist, upload.single("music"), musicController.createMusic);
router.post("/album",authMiddleware.authArtist, musicController.createAlbum);
//Export
module.exports = router;
