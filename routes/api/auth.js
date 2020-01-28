const express = require("express");
const router = express.Router();
const passport = require("passport");
//Player Model
const User = require("../../models/user.model");

router.post("/", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/", (req, res) => {
  res.send(req.user);
});

module.exports = router;
