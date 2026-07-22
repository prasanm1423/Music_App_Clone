//imports
const express = require("express");
const authRoutes = require("./Routes/auth.routes");
const musicRoutes = require("./Routes/music.routes");
const app = express();
const cookieParser = require("cookie-parser");

//middelWares
app.use(express.json());
app.use(cookieParser());
app.use("/api/routes", authRoutes);
app.use("/api/music", musicRoutes);

//exporting
module.exports = app;
