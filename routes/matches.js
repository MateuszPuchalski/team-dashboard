var express = require("express");
var router = express.Router();
var db = require("../db.js");

/* GET users listing. */
router.get("/", function(req, res, next) {
  db.query("SELECT * FROM matches", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:matchId", function(req, res, next) {
  db.query(
    `SELECT * FROM match_log WHERE match_id = ${req.params.matchId}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.post("/matchLog/add", function(req, res, next) {
  const data = req.body;
  console.log(data);

  const values = [];
  Object.values(data).forEach(element => {
    if (typeof element == typeof "") {
      values.push(`'${element}'`);
    } else {
      values.push(element);
    }
  });
  console.log(values);

  db.query(
    `INSERT INTO match_log(${Object.keys(
      data
    ).join()}) VALUES (${values.join()})`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/youtubeId/:matchId", function(req, res, next) {
  db.query(
    `SELECT youtube_id FROM matches WHERE id = ${req.params.matchId}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/logos/:id", function(req, res, next) {
  db.query(
    `SELECT matches.against, matches.date, stats.player_id, stats.match_id, matches.youtube_id FROM stats LEFT JOIN matches ON matches.id = stats.match_id JOIN players ON players.id = stats.player_id WHERE player_id = ${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// SELECT matches.against, matches.date, stats.player_id, stats.match_id FROM stats LEFT JOIN matches ON matches.id = stats.match_id JOIN players ON players.id = stats.player_id WHERE player_id = 1

module.exports = router;
