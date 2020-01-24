var express = require("express");
var path = require("path");
var cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./config/passport")(passport);
const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connected");
});
// const auth = require("./middleware/auth");
const playersRouter = require("./routes/api/players");
const competitionsRouter = require("./routes/api/competitions");
const clubsRouter = require("./routes/api/clubs");
const matchesRouter = require("./routes/api/matches");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "cats" }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/players", playersRouter);
app.use("/api/competitions", competitionsRouter);
app.use("/api/clubs", clubsRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
