const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token

  if (!token) res.status(401).json({ msg: "no token, authorization denied" });

  try {
    //Verify token signature
    const decoded = jwt.verify(token, SECRET);
    console.log(decoded);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
