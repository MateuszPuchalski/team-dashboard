const express = require("express");
const router = express.Router();

//Club Model
const Match = require("../../models/match.model");

router.get("/", (req, res) => {
  Match.find()
    .populate(["homeTeam", "awayTeam"])
    .then(matches => res.json(matches));
});

router.post("/add", (req, res) => {
  const newMatch = new Match({
    ...req.body
  });
  newMatch.save().then(match => res.json(match));
});

module.exports = router;
