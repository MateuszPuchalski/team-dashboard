const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Player Model
const Player = require("../../models/player.model");

router.get("/", (req, res) => {
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
  const userId = req.user.id;

  const newPlayer = new Player({
    name,
    currentClub,
    position,
    weight,
    height,
    jerseyNumber,
    date,
    addedBy: userId
  });
  newPlayer.save().then(player => res.json(player));
});

module.exports = router;
