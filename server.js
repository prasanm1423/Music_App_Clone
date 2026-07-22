//Imports
require("dotenv").config();
const express = require("express");
const app = require("./src/app");
const connectDB = require("./src/Database/db");
const PORT = process.env.PORT || 3000;

//Databse Connection
connectDB();

//server starting
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
