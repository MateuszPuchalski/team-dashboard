const express = require("express");
const router = express.Router();

//Club Model
const Event = require("../../models/event.model");

router.get("/", (req, res) => {
  Event.find()
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
