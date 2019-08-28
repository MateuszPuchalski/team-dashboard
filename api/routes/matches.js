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

module.exports = router;
