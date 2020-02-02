const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: { type: String, required: true },
    currentClub: { type: Schema.Types.ObjectId, ref: "Club" }, // add refrence to club model
    position: { type: String },
    weight: { type: Number },
    height: { type: Number },
    jerseyNumber: { type: Number },
    date: { type: Date },
    addBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = Player = mongoose.model("Player", playerSchema);
