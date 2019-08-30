const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  charset: "utf8",
  database: "dashboard"
});

// Connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

module.exports = db;
