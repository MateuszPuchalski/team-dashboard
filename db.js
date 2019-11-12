const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "jfrpocyduwfg38kq.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
//   user: "w823akrx2xywm1k9",
//   password: "vquxedcebm1q41ua",
//   charset: "utf8",
//   database: "pqrr08fhcy6z1zhv"
// });
// database: "pqrr08fhcy6z1zhv"
if (process.env.JAWSDB_URL) {
  var db = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    charset: "utf8",
    database: "dashboard"
  });
}

// Connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

module.exports = db;
