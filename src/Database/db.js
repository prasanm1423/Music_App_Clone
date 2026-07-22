//imports
require("dotenv").config();
const mongoose = require("mongoose");

//database connection function
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connection Successful");
  } catch (err) {
    console.error("Database Connection Failed", error);
  }
}

//db function exports
module.exports = connectDB;
