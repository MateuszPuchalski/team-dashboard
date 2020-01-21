const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//Player Model
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const auth = require("../../middleware/auth");

router.post("/", (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exists" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

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

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
