var express = require("express");
var router = express.Router();
var db = require("../db.js");

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

module.exports = router;
