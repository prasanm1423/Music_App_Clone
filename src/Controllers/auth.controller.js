//imports
require("dotenv").config();
const userModel = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register User Function(step 2)
async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    return res.status(409).json({
      message: "user already Exist",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    role,
  });
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user Created Successfully",
    use: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

//loginUser Function(step 3)
async function loginUser(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(401).json({
      message: "Invalid Creditionals",
    });
  }
  const isPassowrdValid = await bcrypt.compare(password, user.password);
  if (!isPassowrdValid) {
    return res.status(401).json({
      message: "Invalid Creditionals",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

//exports
module.exports = { registerUser, loginUser };
