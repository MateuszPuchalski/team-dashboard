const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middleware/isAuthenticated");

router.get("/", (req, res) => {
  req.session.viewCount += 1;
  res.send({ viewCount: req.session.viewCount });
});

router.get("/prot", isAuthenticated, (req, res) => {
  res.send({ Permission: "allowed" });
});

module.exports = router;
