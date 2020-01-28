function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
}

module.exports = isAuthenticated;
