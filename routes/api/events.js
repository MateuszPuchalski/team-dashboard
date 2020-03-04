const express = require("express");
const router = express.Router();

//Club Model
const Event = require("../../models/event.model");

router.get("/", (req, res) => {
  Event.find()
    .populate(["team", "player"])
    .populate([
      {
        path: "matchId",
        populate: [{ path: "homeTeam awayTeam" }]
      }
    ])
    .then(events => res.json(events));
});

router.get("/player/:playerId", (req, res) => {
  Event.find({ player: req.params.playerId })
    .populate(["matchId", "team", "player"])
    .then(events => res.json(events));
});

router.get("/player/:playerId/match/:matchId", (req, res) => {
  Event.find({ player: req.params.playerId, matchId: req.params.matchId })
    .populate(["matchId", "team", "player"], populate(["homeTeam", "awayTeam"]))

    .then(events => res.json(events));
});

router.get("/match/:matchId", (req, res) => {
  Event.find({ matchId: req.params.matchId })
    .populate(["matchId", "team", "player"])

    .then(events => res.json(events));
});

router.post("/add", (req, res) => {
  console.log({ event: { ...req.body } });
  const newEvent = new Event({
    ...req.body
  });
  newEvent.save().then(event => res.json(event));
});

module.exports = router;
