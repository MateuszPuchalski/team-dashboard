const express = require("express");
const router = express.Router();

//Club Model
const Competition = require("../../models/competition.model");

router.get("/", (req, res) => {
  Competition.find().then(competitions => res.json(competitions));
});

router.post("/add", (req, res) => {
  const newCompetition = new Competition({
    name: "WARSZAWSKO-MAZOWIECKA II LIGA MĘŻCZYZN GR. III B",
    gender: "male",
    countryName: "Poland",
    seasonName: "2019/2020"
  });
  newCompetition.save().then(competition => res.json(competition));
});

module.exports = router;
