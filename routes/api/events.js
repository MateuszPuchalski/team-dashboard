const express = require("express");
const router = express.Router();

//Club Model
const Event = require("../../models/event.model");

router.get("/", (req, res) => {
  Event.find()
    .populate(["matchid", "team", "player"])
    .then(events => res.json(events));
});

router.get("/:playerId", (req, res) => {
  Event.find({ player: req.params.playerId })
    .populate(["matchid", "team", "player"])
    .then(events => res.json(events));
});

router.get("/:playerId/:matchId", (req, res) => {
  Event.find({ player: req.params.playerId, matchId: req.params.matchId })
    .populate(["matchid", "team", "player"])
    .then(events => res.json(events));
});

router.get("/match/:matchId", (req, res) => {
  Event.find({ matchId: req.params.matchId })
    .populate(["matchid", "team", "player"])
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
