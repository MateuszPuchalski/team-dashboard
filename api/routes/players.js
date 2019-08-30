var express = require("express");
var router = express.Router();
var db = require("../db.js");
// SELECT * FROM players JOIN (stats JOIN matches ON stats.match_id=matches.id) ON players.id=stats.player_id
/* GET users listing. */
router.get("/:playerId", function(req, res, next) {
  db.query(
    `SELECT * FROM players WHERE id = ${req.params.playerId}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/:playerId/goals", function(req, res, next) {
  db.query(
    `SELECT * FROM stats WHERE player_id = ${req.params.playerId}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;

//SELECT player_id, against, name, surname, position, goals, height, weight, age, nr
//FROM players JOIN (stats JOIN matches ON stats.match_id=matches.id) ON players.id=stats.player_id
