const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");
const isAuthenticated = require("../../middleware/isAuthenticated");

//Player Model
const Player = require("../../models/player.model");

router.get("/", isAuthenticated, (req, res) => {
  Player.find()
    .populate(["currentClub", "addBy"])
    .then(players => res.json(players));
});
router.post("/add", (req, res) => {
  const {
    name,
    currentClub,
    position,
    weight,
    height,
    jerseyNumber,
    date
  } = req.body;
  const userId = req.body.userid;

  const newPlayer = new Player({
    name,
    currentClub,
    position,
    weight,
    height,
    jerseyNumber,
    date,
    addBy: userId
  });
  newPlayer.save().then(player => res.json(player));
});

module.exports = router;
