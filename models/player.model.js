const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: { type: String, required: true },
    currentClub: { type: Schema.Types.ObjectId, ref: "Club" }, // add refrence to club model
    position: String,
    weight: Number,
    height: Number,
    jerseyNumber: Number,
    date: Date,
    avatar: String,
    addBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = Player = mongoose.model("Player", playerSchema);
