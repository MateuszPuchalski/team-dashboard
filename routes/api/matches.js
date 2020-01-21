const express = require("express");
const router = express.Router();

//Club Model
const Match = require("../../models/match.model");

router.get("/", (req, res) => {
  Match.find().then(matches => res.json(matches));
});

router.post("/add", (req, res) => {
  const newMatch = new Match({
    competition: req.body.competition,
    matchDate: req.body.matchDate,
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore
  });
  newMatch.save().then(match => res.json(match));
});

module.exports = router;
