const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../../models/user.model");

const createToken = data => {
  const jwtPayload = data;
  return jwt.sign(jwtPayload, JWT_SECRET);
};

const handleSignin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("Co ty odpierdalasz wypełnij te dwa pola");
  }
  return User.findOne({ email: email }).then(data => {
    const isValid = bcrypt.compareSync(password, data.password);
    if (isValid) {
      const token = createToken(email);
      console.log({ token });
      return res.json({ token, email: data.email });
    } else {
      return res.send("Wrong password boyyy!");
    }
  });
};

const verifyToken = (req, res) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, JWT_SECRET, (err, decoded) => {
    res.json(decoded);
  });
};

router.post("/", (req, res) => {
  const { authorization } = req.headers;
  return authorization ? verifyToken(req, res) : handleSignin(req, res);
});

router.get("/test", (req, res) => {
  return res.send("GOOD GOOD");
});

module.exports = router;
