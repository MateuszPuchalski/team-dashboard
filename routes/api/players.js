const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");
const isAuthenticated = require("../../middleware/isAuthenticated");

//Player Model
const Player = require("../../models/player.model");

router.get("/", (req, res) => {
  Player.find()
    .populate(["currentClub", "addBy"])
    .then(players => res.json(players));
});

router.get("/:playerId", async (req, res) => {
  Player.findById(req.params.playerId)
    .populate(["currentClub"])
    .then(player => res.json(player));
});

router.get("/club/:clubId", (req, res) => {
  console.log({ clubId: req.params.clubId });
  Player.find({ currentClub: req.params.clubId })
    .populate(["currentClub", "addBy"])
    .then(players => res.json(players));
});
router.post("/add", (req, res) => {
  const newPlayer = new Player({
    ...req.body
  });
  console.log({ newPlayer: newPlayer });
  newPlayer.save().then(player => res.json(player));
});

module.exports = router;
