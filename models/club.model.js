const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: { type: String, required: true },
    currentCompetition: { type: Schema.Types.ObjectId, ref: "Competition" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = Club = mongoose.model("Club", clubSchema);
