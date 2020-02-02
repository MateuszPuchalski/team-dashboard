const express = require("express");
const router = express.Router();
const passport = require("passport");
//Player Model
const User = require("../../models/user.model");
const isAuthenticated = require("../../middleware/isAuthenticated");

router.post("/", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

module.exports = router;
