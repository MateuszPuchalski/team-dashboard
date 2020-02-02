const express = require("express");
const router = express.Router();

//Club Model
const Club = require("../../models/club.model");

router.get("/", (req, res) => {
  Club.find()
    .populate([
      "currentCompetition",
      { path: "createdBy", select: "-password" }
    ])
    .then(clubs => {
      res.json(clubs);
    });
});

router.get("/:id", (req, res) => {
  Club.find({ createdBy: req.params.id })
    .populate([
      "currentCompetition",
      { path: "createdBy", select: "-password" }
    ])
    .then(clubs => {
      console.log({ clubs: clubs });
      res.json(clubs);
    });
});

router.post("/add", (req, res) => {
  const newClub = new Club({
    name: req.body.name,
    currentCompetition: req.body.competition,
    owner: req.body.userid
  });
  newClub.save().then(club => res.json(club));
});

module.exports = router;
