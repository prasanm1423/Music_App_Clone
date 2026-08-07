const jwt = require("jsonwebtoken");
async function authArtist(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not fount or not a user",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Unauthorized user access",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error while authenticatig user",
    });
  }
}

module.exports = { authArtist };
