const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Player Model
const User = require("../../models/user.model");
const SECRET = process.env.JWT_SECRET;
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

router.post("/add", (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      email,
      password
    });

    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        jwt.sign({ id: user.id }, SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email }
          });
        });
      });
    });
  });
});

module.exports = router;
