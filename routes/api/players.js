const express = require("express");
const router = express.Router();
const Datauri = require("datauri");
const cloudinary = require("cloudinary").v2;
// const auth = require("../../middleware/auth");
const isAuthenticated = require("../../middleware/isAuthenticated");
const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");

//Player Model
const Player = require("../../models/player.model");

router.get("/", (req, res) => {
  Player.find()
    .populate(["currentClub", "addBy"])
    .then(players => res.json(players));
});

router.post("/upload", multerUploads, (req, res) => {
  const dUri = new Datauri();
  const dataUri = dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
  cloudinary.uploader.upload(req.file, (error, result) => {
    console.log(result);
  });
});

router.get("/:playerId", async (req, res) => {
  Player.findById(req.params.playerId)
    .populate(["currentClub"])
    .then(player => res.json(player));
});

router.put("/:playerId/edit", async (req, res) => {
  Player.findOneAndUpdate(
    { _id: req.params.playerId },
    { name: "test" },
    () => {
      console.log("POSzlo");
    }
  );
});

router.get("/club/:clubId", (req, res) => {
  Player.find({ currentClub: req.params.clubId })
    .populate(["currentClub", "addBy"])
    .then(players => res.json(players));
});

router.post("/add", (req, res) => {
  const newPlayer = new Player({
    ...req.body
  });
  console.log({ newPlayer: newPlayer });
  newPlayer.save().then(player => res.json(player));
});

module.exports = router;
