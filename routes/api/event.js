const express = require("express");
const router = express.Router();

//Club Model
const Event = require("../../models/event.model");

router.get("/", (req, res) => {
  Event.find().then(events => res.json(events));
});

router.post("/add", (req, res) => {
  const newEvent = new Event({
    ...req.body
  });
  newEvent.save().then(event => res.json(event));
});

module.exports = router;