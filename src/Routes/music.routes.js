const express = require("express");
const musicController = require("../Controllers/music.controller");
const multer=require('multer')
const router = express.Router();

//multer uplod 
const upload=multer({
    storage:multer.memoryStorage()
})
//Routes
router.post("/upload",upload.single('music'), musicController.createMusic);
//Export
module.exports = router;
